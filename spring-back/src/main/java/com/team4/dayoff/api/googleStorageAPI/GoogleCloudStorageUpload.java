package com.team4.dayoff.api.googleStorageAPI;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import org.springframework.web.multipart.MultipartFile;

/** A snippet for Google Cloud Storage showing how to create a blob. */
public class GoogleCloudStorageUpload {

	private static Storage storage = null;

	// [START init]
	static {
		storage = StorageOptions.getDefaultInstance().getService();
	}

	public static String getImageUrl(MultipartFile file, final String bucketName) throws IOException {
		final String fileName = file.getOriginalFilename();
		// Check extension of file
		if (fileName != null && !fileName.isEmpty() && fileName.contains(".")) {
			final String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
			String[] allowedExt = { "jpg", "jpeg", "png", "gif" };
			for (String s : allowedExt) {
				if (extension.equals(s)) {
					return uploadFile(file, bucketName, s);
				}
			}
		}
		return null;
	}

	@SuppressWarnings("deprecation")
	public static String uploadFile(MultipartFile file, final String bucketName, String type) throws IOException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("-YYYY-MM-dd-HHmmssSSS");
		String date = simpleDateFormat.format(new Date());
		String filen = file.getOriginalFilename();
		final String fileName = filen.substring(0, filen.lastIndexOf('.')) + date
				+ filen.substring(filen.lastIndexOf('.'));
		System.out.println("1111111111111111111");
		BufferedInputStream stream = new BufferedInputStream(file.getInputStream());
		BlobInfo blobInfo = storage
				.create(BlobInfo.newBuilder(bucketName, fileName).setContentType("image/" + type).build(), stream);
		System.out.println("22222222222222222222222");
		return blobInfo.getMediaLink();

		// https://storage.googleapis.com/bit-jaehoon/image.jpg : 아무나 볼 수 있는 url
		// the inputstream is closed by default, so we don't need to close it here

	}

	public static String saveFile(MultipartFile file) {
		String name = null;
		try {
			String url = getImageUrl(file, "bit-jaehoon");
			name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// [END storage_upload_file]
		return name;
	}

	public static void deleteFile(String name) {
		BlobId blobId = BlobId.of("bit-jaehoon", name);
		boolean deleted = storage.delete(blobId);
		if (deleted)
			System.out.println(name+" 삭제완료");
	}

	// csv파일 스토리지 업로드 재훈사용

	public static String getImageUrl(File file, final String bucketName) throws IOException {
		final String fileName = file.getName();
		// Check extension of file
		if (fileName != null && !fileName.isEmpty() && fileName.contains(".")) {
			final String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
			String[] allowedExt = { "jpg", "jpeg", "png", "gif", "csv" };
			for (String s : allowedExt) {
				if (extension.equals(s)) {
					return uploadFile(file, bucketName, s);
				}
			}
		}
		return null;
	}

	@SuppressWarnings("deprecation")
	public static String uploadFile(File file, final String bucketName, String type) throws IOException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("-YYYY-MM-dd-HHmmssSSS");
		String date = simpleDateFormat.format(new Date());
		String filen = file.getName();
		FileInputStream fis = new FileInputStream(file);
		final String fileName = filen.substring(0, filen.lastIndexOf('.')) + date
				+ filen.substring(filen.lastIndexOf('.'));
		System.out.println("1111111111111111111");
		BufferedInputStream stream = new BufferedInputStream(fis);
		BlobInfo blobInfo = storage.create(
				BlobInfo.newBuilder(bucketName, file.getName()).setContentType("image/" + type).build(), stream);
		System.out.println("22222222222222222222222");
		return blobInfo.getMediaLink();

		// https://storage.googleapis.com/bit-jaehoon/image.jpg : 아무나 볼 수 있는 url
		// the inputstream is closed by default, so we don't need to close it here

	}

	public static String saveFile(File file) {
		String name = null;
		try {
			String url = getImageUrl(file, "bit-jaehoon");
			name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// [END storage_upload_file]
		return name;
	}

}
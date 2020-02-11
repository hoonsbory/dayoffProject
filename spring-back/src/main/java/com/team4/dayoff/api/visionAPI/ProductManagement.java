package com.team4.dayoff.api.visionAPI;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.BatchOperationMetadata;
import com.google.cloud.vision.v1.CreateProductSetRequest;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Feature.Type;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageContext;
import com.google.cloud.vision.v1.ImageSource;
import com.google.cloud.vision.v1.ImportProductSetsGcsSource;
import com.google.cloud.vision.v1.ImportProductSetsGcsSource.Builder;
import com.google.cloud.vision.v1.ImportProductSetsInputConfig;
import com.google.cloud.vision.v1.ImportProductSetsResponse;
import com.google.cloud.vision.v1.LocalizedObjectAnnotation;
import com.google.cloud.vision.v1.Product;
import com.google.cloud.vision.v1.ProductName;
import com.google.cloud.vision.v1.ProductSearchClient;
import com.google.cloud.vision.v1.ProductSearchParams;
import com.google.cloud.vision.v1.ProductSearchResults.Result;
import com.google.cloud.vision.v1.ProductSet;
import com.google.cloud.vision.v1.ReferenceImage;
import com.google.protobuf.ByteString;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature.Type;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * ProductManagement
 */
@Service
public class ProductManagement {

	// public static void main(String[] args) throws Exception {
	// detectLabels("1111589_2_500.jpg");
	//// }
	public static void main(String[] args) {
		try {
			detectObjects("./newfile");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	private static Image getImage(String filePath) throws IOException {
		Image image;

		if (filePath.startsWith("gs://")) {
			ImageSource imgSource = ImageSource.newBuilder().setGcsImageUri(filePath).build();
			image = Image.newBuilder().setSource(imgSource).build();
		} else {
			ByteString imgBytes = ByteString.readFrom(new FileInputStream(filePath));
			image = Image.newBuilder().setContent(imgBytes).build();
		}

		return image;
	}

	public static List<EntityAnnotation> detectLabels(String filePath) throws Exception {
		List<AnnotateImageRequest> requests = new ArrayList<>();

		Image image = getImage(filePath);

		List<EntityAnnotation> result = new ArrayList<EntityAnnotation>();

		Feature feature = Feature.newBuilder().setType(Feature.Type.LABEL_DETECTION).build();
		AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
		requests.add(request);

		try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
			BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
			List<AnnotateImageResponse> responses = response.getResponsesList();

			for (AnnotateImageResponse res : responses) {
				if (res.hasError()) {
					System.out.println("Error: " + res.getError().getMessage());

				}
				System.out.println(res.getAllFields());
				// For full list of available annotations, see http://g.co/cloud/vision/docs
				for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
					
					result.add(annotation);
					if(annotation.getScore()>0.7){
						 System.out.println(annotation.getDescription());

					}

					// annotation.getAllFields().forEach((k, v) -> System.out.println(k + " : " + v.toString()));
				}
			}
		}
		return result;
	}
	public static List<LocalizedObjectAnnotation> detectObjects(String filePath) throws Exception {
		List<AnnotateImageRequest> requests = new ArrayList<>();

		Image image = getImage(filePath);

		List<LocalizedObjectAnnotation> result = new ArrayList<LocalizedObjectAnnotation>();

		Feature feature = Feature.newBuilder().setType(Feature.Type.OBJECT_LOCALIZATION).build();
		AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
		requests.add(request);

		try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
			BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
			List<AnnotateImageResponse> responses = response.getResponsesList();

			for (AnnotateImageResponse res : responses) {
				if (res.hasError()) {
					System.out.println("Error: " + res.getError().getMessage());

				}
				System.out.println(res.getAllFields());
				// For full list of available annotations, see http://g.co/cloud/vision/docs
				for (LocalizedObjectAnnotation annotation : res.getLocalizedObjectAnnotationsList()) {
					
					result.add(annotation);
					if(annotation.getScore()>0.7){
						 System.out.println(annotation.getName());

					}

					// annotation.getAllFields().forEach((k, v) -> System.out.println(k + " : " + v.toString()));
				}
			}
		}
		return result;
	}
	// public static void main(String[] args) throws IOException {
	// 	listProducts("strong-kit-252505", "asia-east1");
	// 	// listProductSets("strong-kit-252505", "asia-east1");
	// 	//  deleteProductSet("strong-kit-252505", "asia-east1", "bitDayOff");
	// 	// deleteProduct("'asdas'");
	// 	// listReferenceImagesOfProduct("Faux leather coat with shearling");
	// }
	public static void deleteProductSet(String projectId, String computeRegion, String productSetId)
      throws IOException {
    try (ProductSearchClient client = ProductSearchClient.create()) {

      // Get the full path of the product set.
      String formattedName =
          ProductSearchClient.formatProductSetName(projectId, computeRegion, productSetId);
      // Delete the product set.
      client.deleteProductSet(formattedName);
      System.out.println(String.format("Product set deleted"));
    }
  }
    public static void createProductSet(
        String projectId, String computeRegion, String productSetId, String productSetDisplayName)
        throws IOException {
      try (ProductSearchClient client = ProductSearchClient.create()) {

        // A resource that represents Google Cloud Platform location.
        String formattedParent = ProductSearchClient.formatLocationName(projectId, computeRegion);

        // Create a product set with the product set specification in the region.
        ProductSet myProductSet =
            ProductSet.newBuilder().setDisplayName(productSetDisplayName).build();
        CreateProductSetRequest request =
            CreateProductSetRequest.newBuilder()
                .setParent(formattedParent)
                .setProductSet(myProductSet)
                .setProductSetId(productSetId)
                .build();
        ProductSet productSet = client.createProductSet(request);
        // Display the product set information
            System.out.println(String.format("Product set name: %s", productSet.getName()));
      }
    }



    public static void createProduct(String projectId, String computeRegion, String productId,
			String productDisplayName, String productCategory) throws IOException {
		try (ProductSearchClient client = ProductSearchClient.create()) {

			// A resource that represents Google Cloud Platform location.
			String formattedParent = ProductSearchClient.formatLocationName(projectId, computeRegion);
			// Create a product with the product specification in the region.
			// Multiple labels are also supported.
			Product myProduct = Product.newBuilder().setName(productId).setDisplayName(productDisplayName)
					.setProductCategory(productCategory).build();
			Product product = client.createProduct(formattedParent, myProduct, productId);
			// Display the product information
			System.out.println(String.format("Product name: %s", product.getName()));
		}
    }
    

    public static void addProductToProductSet(
	      String projectId, String computeRegion, String productId, String productSetId)
	      throws IOException {
	    try (ProductSearchClient client = ProductSearchClient.create()) {

	      // Get the full path of the product set.
	      String formattedName =
	          ProductSearchClient.formatProductSetName(projectId, computeRegion, productSetId);

	      // Get the full path of the product.
	      String productPath = ProductName.of(projectId, computeRegion, productId).toString();

	      // Add the product to the product set.
	      client.addProductToProductSet(formattedName, productPath);

	      System.out.println(String.format("Product added to product set."));
	    }
      }
      
      public static void createReferenceImage(String projectId, String computeRegion, String productId,
			String referenceImageId, String gcsUri) throws IOException {
		try (ProductSearchClient client = ProductSearchClient.create()) {

			// Get the full path of the product.
			String formattedParent = ProductSearchClient.formatProductName(projectId, computeRegion, productId);
			// Create a reference image.
			ReferenceImage referenceImage = ReferenceImage.newBuilder().setUri(gcsUri).build();

			ReferenceImage image = client.createReferenceImage(formattedParent, referenceImage, referenceImageId);
			// Display the reference image information.
			System.out.println(String.format("Reference image name: %s", image.getName()));
			System.out.println(String.format("Reference image uri: %s", image.getUri()));
        }
    }

    public void importProductSets(String gcsUri)
	    throws Exception {
	  try (ProductSearchClient client = ProductSearchClient.create()) {

	    // A resource that represents Google Cloud Platform location.
	    String formattedParent = ProductSearchClient.formatLocationName("strong-kit-252505", "asia-east1");
	    Builder gcsSource = ImportProductSetsGcsSource.newBuilder().setCsvFileUri(gcsUri);

	    // Set the input configuration along with Google Cloud Storage URI
	    ImportProductSetsInputConfig inputConfig =
	        ImportProductSetsInputConfig.newBuilder().setGcsSource(gcsSource).build();

	    // Import the product sets from the input URI.
	    OperationFuture<ImportProductSetsResponse, BatchOperationMetadata> response =
	        client.importProductSetsAsync(formattedParent, inputConfig);

	    System.out.println(String.format("Processing operation name: %s", response.getName()));
	    ImportProductSetsResponse results = response.get();
	    System.out.println("Processing done.");
	    System.out.println("Results of the processing:");

	    for (int i = 0; i < results.getStatusesCount(); i++) {
	      System.out.println(
	          String.format(
	              "Status of processing line %s of the csv: %s", i, results.getStatuses(i)));
	      // Check the status of reference image.
	      if (results.getStatuses(i).getCode() == 0) {
	        ReferenceImage referenceImage = results.getReferenceImages(i);
	        System.out.println(referenceImage);
	      } else {
	        System.out.println("No reference image.");
	      }
	    }
	  }
    }
    

    public static  List<String> getSimilarProductsFile(
      String productCategory,
      String filePath)
      throws IOException {
		 List<String> imageList = new ArrayList<String>();

    try (ImageAnnotatorClient queryImageClient = ImageAnnotatorClient.create()) {

      // Get the full path of the product set.
      String productSetPath =
		  ProductSearchClient.formatProductSetName("strong-kit-252505", "asia-east1", "visionSearch");
		  //ourProduct

      // Read the image as a stream of bytes.
      File imgPath = new File(filePath);
      byte[] content = Files.readAllBytes(imgPath.toPath());

      // Create annotate image request along with product search feature.
      Feature featuresElement = Feature.newBuilder().setType(Type.PRODUCT_SEARCH).build();
      // The input image can be a HTTPS link or Raw image bytes.
      // Example:
      // To use HTTP link replace with below code
      //  ImageSource source = ImageSource.newBuilder().setImageUri(imageUri).build();
      //  Image image = Image.newBuilder().setSource(source).build();
      Image image = Image.newBuilder().setContent(ByteString.copyFrom(content)).build();
      ImageContext imageContext =
          ImageContext.newBuilder()
              .setProductSearchParams(
                  ProductSearchParams.newBuilder()
                      .setProductSet(productSetPath)
                      .addProductCategories(productCategory)
                      )
              .build();

      AnnotateImageRequest annotateImageRequest =
          AnnotateImageRequest.newBuilder()
              .addFeatures(featuresElement)
              .setImage(image)
              .setImageContext(imageContext)
              .build();
      List<AnnotateImageRequest> requests = Arrays.asList(annotateImageRequest);

      
      // Search products similar to the image.
      BatchAnnotateImagesResponse response = queryImageClient.batchAnnotateImages(requests);
      
      System.out.println(response);
      
      List<Result> similarProducts =
          response.getResponses(0).getProductSearchResults().getResultsList();
      System.out.println("Similar Products: ");
      for (Result product : similarProducts) {
        System.out.println(String.format("\nProduct name: %s", product.getProduct().getName()));
        System.out.println(
            String.format("Product display name: %s", product.getProduct().getDisplayName()));
        System.out.println(
            String.format("Product description: %s", product.getProduct().getDescription()));
        System.out.println(String.format("Score(Confidence): %s", product.getScore()));
		System.out.println(String.format("Image name: %s", product.getImage()));
		System.out.println(product.getProduct().getProductCategory());
        if(product.getScore() > 0.395) {
        	System.out.println(product.getScore());
			String name = product.getProduct().getDisplayName();
        imageList.add(name);
		}
		if(imageList.size()==0 && product.getScore() > 0.30){
			String category = product.getProduct().getProductLabels(0).getValue();
			imageList.add(category);
			imageList.add("category");
			return imageList;
		}
      }
      return imageList;
    }
  }


  public static String listReferenceImagesOfProduct(String productId)
			throws IOException {
		
		try (ProductSearchClient client = ProductSearchClient.create()) {

			// Get the full path of the product.
			String formattedParent = ProductSearchClient.formatProductName("strong-kit-252505", "asia-east1", productId);
			for (ReferenceImage image : client.listReferenceImages(formattedParent).iterateAll()) {
				// Display the reference image information.
				System.out.println(String.format("Reference image name: %s", image.getName()));
				System.out.println(String.format("Reference image id: %s",
						image.getName().substring(image.getName().lastIndexOf('/') + 1)));
				System.out.println(String.format("Reference image uri: %s", image.getUri()));
				System.out.println(String.format("Reference image bounding polygons: %s \n",
						image.getBoundingPolysList().toString()));
			//	List.add(image.getUri());
				return image.getUri();
			}
		}
		return "";
	}
	public static void listProductSets(String projectId, String computeRegion) throws IOException {
		try (ProductSearchClient client = ProductSearchClient.create()) {
			// A resource that represents Google Cloud Platform location.
			String formattedParent = ProductSearchClient.formatLocationName(projectId, computeRegion);
			// List all the product sets available in the region.
			for (ProductSet productSet : client.listProductSets(formattedParent).iterateAll()) {
				// Display the product set information
				System.out.println(String.format("Product set name: %s", productSet.getName()));
				System.out.println(String.format("Product set id: %s",
						productSet.getName().substring(productSet.getName().lastIndexOf('/') + 1)));
				System.out.println(String.format("Product set display name: %s", productSet.getDisplayName()));
				System.out.println("Product set index time:");
				System.out.println(String.format("\tseconds: %s", productSet.getIndexTime().getSeconds()));
				System.out.println(String.format("\tnanos: %s", productSet.getIndexTime().getNanos()));
				
			}
		}
	}
	/**
	 * List all products.
	 *
	 * @param projectId - Id of the project.
	 * @param computeRegion - Region name.
	 * @throws IOException - on I/O errors.
	 */
	public static void listProducts(String projectId, String computeRegion) throws IOException {
	  try (ProductSearchClient client = ProductSearchClient.create()) {

	    // A resource that represents Google Cloud Platform location.
	    String formattedParent = ProductSearchClient.formatLocationName(projectId, computeRegion);

	    // List all the products available in the region.
	    for (Product product : client.listProducts(formattedParent).iterateAll()) {
	      // Display the product information
	      System.out.println(String.format("\nProduct name: %s", product.getName()));
	      System.out.println(
	          String.format(
	              "Product id: %s",
	              product.getName().substring(product.getName().lastIndexOf('/') + 1)));
	      System.out.println(String.format("Product display name: %s", product.getDisplayName()));
	      System.out.println(String.format("Product category: %s", product.getProductCategory()));
	      System.out.println("Product labels:");
	      System.out.println(
	          String.format("Product labels: %s", product.getProductLabelsList().toString()));
	    }
	  }
	}
		/**
		 * Delete the product and all its reference images.
		 *
		 * @param projectId     - Id of the project.
		 * @param computeRegion - Region name.
		 * @param productId     - Id of the product.
		 * @throws IOException - on I/O errors.
		 */
		public static void deleteProduct( String productId) throws IOException {
			try (ProductSearchClient client = ProductSearchClient.create()) {
	
				// Get the full path of the product.
				String formattedName = ProductSearchClient.formatProductName("strong-kit-252505", "asia-east1", productId);
	
				// Delete a product.
				client.deleteProduct(formattedName);
				System.out.println("Product deleted.");
			}
		}
}
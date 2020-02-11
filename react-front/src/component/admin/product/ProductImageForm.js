import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import './filepicker.css';

class ProductImageForm extends Component {
    constructor(props) {
        super(props);
        var ReactDOMServer = require('react-dom/server');
        const { maxFile } = this.props;
        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration


        this.djsConfig = {
            acceptedFiles: "image/jpg, image/jpeg, image/png, image/gif",
            autoProcessQueue: false,
            maxFiles: maxFile,

            // dictDefaultMessage: `여기로 파일을 드래그하거나 여기를 클릭하세요. ${maxFile?'(개수 제한 : '+maxFile+')':''}`,
            dictInvalidFileType: "지원되는 파일 형식이 아닙니다.",
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview" style={{ display: "inline-block" }}>
                    <div className="dz-image">
                        <img alt="img" data-dz-thumbnail="true" />
                        <span className="dz-remove" data-dz-remove>&times;</span>
                    </div>
                    <div className="dz-error-message"><span data-dz-errormessage></span></div>
                </div>
            )
        };

        this.componentConfig = {
            // iconFiletypes: ['.jpg', '.jpeg', '.png', '.gif'],
            // showFiletypeIcon: true,
            postUrl: 'none'
        };

        this.dropzone = null;
    }

    shouldComponentUpdate(nextProps, prevState) {
        if (this.props.post === false && nextProps.post === true) {
            this.dropzone.removeAllFiles();
        }
        return true;
    }

    onAdd = (file) => {
        this.props.onAdd(file, this.props.stateKey);
    }

    onRemove = (file) => {
        if (file.url && file.url.trim().length > 0) {
           this.props.onRemovePast(file,this.props.stateKey);
        }
        else
            this.props.onRemove(file, this.props.stateKey);
    }

    render() {
        const { maxFile, thumbnailName } = this.props;
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: (dz) => {
                this.dropzone = dz;
                this.dropzone.on("maxfilesexceeded", function (file) {
                    this.removeAllFiles();
                    this.addFile(file);
                });
                if (thumbnailName) {
                    for (var i = 0; i < thumbnailName.length; i++) {
                        var mockFile = { 
                            name: thumbnailName[i], 
                            size: 12345, 
                            type: 'image/jpeg', 
                            // status: Dropzone.ADDED, 
                            url: "https://storage.googleapis.com/bit-jaehoon/"+thumbnailName[i]
                        };
        
                        // Call the default addedfile event handler
                        this.dropzone.emit("addedfile", mockFile);
        
                        // And optionally show the thumbnail of the file:
                        this.dropzone.emit("thumbnail", mockFile, "https://storage.googleapis.com/bit-jaehoon/"+thumbnailName[i]);
        
                        this.dropzone.files.push(mockFile);
                    }
                }
            },
            addedfile: this.onAdd,
            removedfile: this.onRemove
        }
        return (
            <div className="productImageForm">
                {/* <span className="productImageFormName">{name}</span> */}
                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}>
                    <div className="dz-message"><div>{`여기로 파일을 드래그하거나 여기를 클릭하세요. ${maxFile ? '(개수 제한 : ' + maxFile + ')' : ''}`}</div>
                        <div>지원되는 파일 형식: .jpg, .jpeg, .png, .gif</div></div>
                </DropzoneComponent>
            </div>
        );
    }


}

export default ProductImageForm;
function uploadImage() {
    const imageCat = "Photo";
    const backImage = document.querySelector('#imageInput');
    const backImageFile = backImage.files[0];

    // Check if a file is selected
    if (!backImageFile) {
        return;
    }

    const storageRef = firebase.storage().ref('Images/' + imageCat + '/');
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {
            const uploadTask = storageRef.child(backImageFile.name).put(backImageFile);

            uploadTask.on('state_changed',
                function (snapshot) {
                    // Handle upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const roundedOffProgress = Math.round(progress);
                },
                function (error) {
                    // Handle unsuccessful uploads
                },
                function () {
                    // Handle successful upload
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        const newBackImage = firebase.firestore().collection('Images').doc();

                        newBackImage.set({
                            photoURL: downloadURL,
                            MediaCat: imageCat,
                            photoID: newBackImage.id
                            // Add more fields if needed
                        }).then(function () {
                            // Retrieve the generated document ID
                            const docId = newBackImage.id;
                        }).catch(function (error) {
                            console.error('Error saving image data:', error);
                        });
                    });
                }
            );
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(backImageFile);
}

function uploadVideo() {
    const videoCat = document.getElementById("videoCat").value;
    const videoInput = document.querySelector('#videoInput');
    const videoFile = videoInput.files[0];

    // Check if a file is selected and it's a video file
    if (!videoFile || !videoFile.type.startsWith('video/')) {
        console.error("No video selected or invalid video file.");
        return;
    }

    const storageRef = firebase.storage().ref('Videos/' + videoCat + '/');
    const reader = new FileReader();

    reader.onload = function (e) {
        const uploadTask = storageRef.child(videoFile.name).put(videoFile, {
            contentType: videoFile.type, // Set content type in storage metadata
        });

        uploadTask.on('state_changed',
            function (snapshot) {
                // Handle upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const roundedOffProgress = Math.round(progress);
                console.log(roundedOffProgress);
            },
            function (error) {
                // Handle unsuccessful uploads
                console.error('Error uploading video:', error);
            },
            function () {
                // Handle successful upload
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    const newVideo = firebase.firestore().collection('Videos').doc();

                    newVideo.set({
                        videoURL: downloadURL,
                        MediaCat: videoCat,
                        videoID: newVideo.id,
                        // Add more fields if needed
                    }).then(function () {
                        // Retrieve the generated document ID
                        const docId = newVideo.id;
                        console.log("Video Saved with Document ID: " + docId);
                    }).catch(function (error) {
                        console.error('Error saving video data:', error);
                    });
                });
            }
        );
    };

    reader.readAsDataURL(videoFile);
}

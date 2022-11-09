(GET) http://localhost:3000/  => to get the list of buckets

(GET) http://localhost:3000/files => to get the list of items in the bucket


(POST) http://localhost:3000/upload => to upload file to s3 bucket

curl --location --request POST 'http://localhost:3000/upload' \
--form 'file=@"/C:/Users/shubham/Downloads/Shubham Garg(2.1 yr)_backend_developer.pdf"'



(Delete) http://localhost:3000/delete => to delete file from s3 bucket
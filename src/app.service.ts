import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';

@Injectable()
export class AppService {
  async listBuckets() {
    try {
      let s3 = new S3();
      const buckets = await s3.listBuckets().promise();
      return buckets.Buckets;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message)
    }

  }

  async uploadFile(file: Express.Multer.File) {
    try {
      let s3 = new S3();
      await s3.upload({ Bucket: 'node-example-bucket', Key: file.originalname, Body: file.buffer, ContentType: file.mimetype }).promise();
      return 'upload successful';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message)
    }
  }

  async deleteFile() {
    try {
      let s3 = new S3();
      await s3.deleteObject({Bucket: 'node-example-bucket', Key: 'Shubham Garg(2.1 yr)_backend_developer.pdf'}).promise();
      return 'delete successful';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message)
    }
  }

  async getFile(fileName: string) {
    try {
      let s3 = new S3();
      const body = await s3.getObject({Bucket: 'node-example-bucket', Key: fileName}).promise(); 
      const buffer = Buffer.from(body.Body.valueOf() as Buffer);
      return Readable.from(buffer);
    } catch (error) {
      console.log('inside catch')
      console.log(error);
      throw new BadRequestException(error.message)
    }
  }


  async listFiles() {
    try {
      let s3 = new S3();
      return await (await s3.listObjects({Bucket: 'node-example-bucket'}).promise()).Contents;   
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message)
    }
  }

}

import fs from'fs';
import imagekit from "../configs/imageKit.js";
import Blog from '../models/Blog.js';



export const addBlog = async (req, res) => {
  try {
    const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if all fields are provided
    if (!title || !description || !category || !imageFile) {
      return res.json({success: false, message: "Missing required fields"});
    }

    const fileBuffer = fs.readFileSync(imageFile.path)

    // upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer, // required
      fileName: imageFile.originalname, // required
      folder: "/blogs", // optional
    })

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path:response.filePath,
      transformation: [
        {quality: 'auto'}, // Auto compression
        {format: 'webp'},  // Convert to modern format
        {width: '1280'} // Resize to 1280px width
      ]
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished
    });

    res.json({success: true, message: "Blog added successfully"});

  } catch (error) {
    res.json({success: false, message: error.message});
  }
}



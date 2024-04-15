const Post = require("../models/post.js")
const image = require("../utils/image.js")

async function createPost(req, res) {
  try {
    const post = new Post(req.body);
    post.created_at = new Date();

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    const postStored = await post.save();
    res.status(201).send(postStored);
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(400).send({ msg: "Error al crear el post" });
  }
}

async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { created_at: "desc" },
    };

    const posts = await Post.paginate({}, options);
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(400).send({ msg: "Error al obtener los posts" });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    await Post.findByIdAndUpdate({ _id: id }, postData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    console.error("Error al actualizar el post:", error);
    res.status(400).send({ msg: "Error al actualizar el post" });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).send({ msg: "Post eliminado" });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(400).send({ msg: "Error al eliminar el post" });
  }
}

async function getPost(req, res) {
  try {
    const { path } = req.params;
    const postStored = await Post.findOne({ path });

    if (!postStored) {
      res.status(404).send({ msg: "No se ha encontrado ningún post" });
    } else {
      res.status(200).send({ postStored });
    }
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}
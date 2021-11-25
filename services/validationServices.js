const Usuario = require("../models/core/usuario");

exports.validImageFile = (req) => {
  if (!req.file) {
    const error = new Error("Datos inválido. Falta la imagen.");
    error.statusCode = 422;z
    throw error;
  }
};

exports.validImage = (imagen) => {
  if (!imagen) {
    const error = new Error("Imágen inválida.");
    error.statusCode = 422;
    throw error;
  }
};

exports.existElement = (elementos) => {
  if (!elementos) {
    const error = new Error("No se puede encontrar el elemento buscado.");
    error.statusCode = 404;
    throw error;
  } else return elementos;
};

exports.findUser = async (user) => {
  usuario = await Usuario.findOne({ where: { username: user } });
  if (!usuario) {
    const error = new Error("Usuario inválido.");
    error.statusCode = 422;
    throw error;
  }
  return usuario;
};

exports.isUsuarioEqualsUser = (usuario, userName) => {
  if (usuario !== userName) {
    const error = new Error("Not authorized for this operation.");
    error.statusCode = 403;
    throw error;
  }
};

exports.tokenAuthHeader = (authHeader) => {
  if (!authHeader) {
    const error = new Error('The user is not authenticated.')
    error.statusCode = 401
    throw error
  }
};

exports.validDecodedtoken = (decodedToken) => {
  if (!decodedToken) {
    const error = new Error('The user is not authenticated.')
    error.statusCode = 401
    throw error
 }
};

 


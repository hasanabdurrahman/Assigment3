const { Photo, User } = require('../models');

class PhotoController {
    static getAllPhotos(req, res) {
        Photo.findAll({
            include: User
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }


    static getOnePhotoByID(req, res) {
        let id = +req.params.id
        Photo.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    
    }

    static createPhoto(req, res) {
        const { title, caption, image_url } = req.body;
        const user = res.locals.userData
        Photo.create({
            title,
            caption,
            image_url,
            UserId: user.id,
            
        })
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }

    static updateOnePhotoByID(req, res) {
        let id = +req.params.id;
        const { title, caption, image_url } = req.body;
        let data = {
            title,
            caption,
            image_url
        }
        Photo.update(
            data,
            {
                where:{
                    id
                },
                returning: true
            }
        )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static deleteOnePhotoByID(req, res) {
        let id = +req.params.id;
        Photo.destroy({
            where: {
                id
            }
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

}

module.exports = PhotoController;
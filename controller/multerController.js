const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const bannerService = require('../service/bannerService');
const postService = require('../service/postService');

module.exports = {
    uploadImage: async (req, res) => {
        const { location: image } = req.file;
            if(!image) {
                console.log('필요한 값을 넣지 않았습니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
        try {
            const upload = await bannerService.uploadBannerImage(image);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_IMAGE_UPLOAD_SUCCESS, upload));
        } catch(error) {
            console.log(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_IMAGE_UPLOAD_FAIL));
        }
    },
    uploadImages: async (req, res) => {
        const { postId } = req.params;
        const imageUrls = req.files.map(file => file.location);
        
        try {
            const findPostDetailId = await postService.findPostDetailId(postId);
            let postDetailId = findPostDetailId.dataValues.id
            const findPostDetailImageId = await postService.findPostDetailImageId(postDetailId);

            if (findPostDetailImageId) {
                console.log('사진이 중복 등록 되었습니다.');
            } else {
                for (let i = 0; i < imageUrls.length; i++) {
                    const postDetailImageCreate = await postService.createPostDetailImage(findPostDetailId.dataValues.id, imageUrls[i]);
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_IMAGE_UPLOAD_FAIL));
        }
    }
}
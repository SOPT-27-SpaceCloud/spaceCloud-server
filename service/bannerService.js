const { Banner } = require('../models');

module.exports = {
    uploadBannerImage: async (image) => {
        try {
            const uploadBannerImage = await Banner.create({
                bannerImageUrl: image
            })
            return uploadBannerImage;
        } catch (err) {
            throw err;
        }
    },

    /* 배너 사진 조회 API 개발 */
}


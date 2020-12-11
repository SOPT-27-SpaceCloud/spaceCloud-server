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
    bannerReadAll: async () => {
        try {
            const readAllBanner = await Banner.findAll({});
            return readAllBanner;
        } catch (err) {
            throw err;
        }
    }
}


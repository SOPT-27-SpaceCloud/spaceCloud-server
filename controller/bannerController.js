const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const bannerService = require('../service/bannerService');


module.exports = {
    readAllBanner: async (req, res) => {
        try{
            const getReadAllBanner = await bannerService.bannerReadAll();
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_BANNER_IMAGE_SUCCESS, getReadAllBanner));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_BANNER_IMAGE_FAIL));
        }
    }
}
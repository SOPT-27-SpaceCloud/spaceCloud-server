const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const postService = require('../service/postService');
const { findPostDetailSelectIdOne } = require('../service/postService');

module.exports = {

    // Post API
    createPost: async (req, res) => {
        const { location: image } = req.file;
        const { title, address, price, category } = req.body;
        if(!title || !address || !price || !category || !image) {
            console.log('필요한 값을 넣지 않았습니다.');
            return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const postCreate = await postService.createPost(title, address, price, image, category);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, postCreate));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    readAllPost: async (req, res) => {
        try {
            const getReadAllPost = await postService.readAllPost();
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, getReadAllPost));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_FAIL));
        }
    },
    findAllPost: async (req, res) => {
        const { category } = req.body;
            if (!category) {
                console.log('카테고리 입력값이 없습니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
        try {
            const findAllPost = await postService.findAllPost(category);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.FIND_POST_SUCCESS, findAllPost));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.FIND_POST_FAIL));
        }
    },

    // PostDetail API
    createPostDetail: async (req, res, next) => {
        const { contents, introducedPlace, openingHours, closedDays, notice } = req.body;
        const { postId } = req.params;
        
        if(!contents ||!introducedPlace || !openingHours || !closedDays || !notice || !postId) {
                console.log('필요한 값을 넣지 않았습니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE)); 
            }

        try {
            const findPostId = await postService.findPostId(postId);
            if (!findPostId) {
                console.log('원하는 post id값이 없습니다.')
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.FIND_POST_ID_FAIL));
            }
            
            const findPostDetailId = await postService.findPostDetailId(postId);

            if (findPostDetailId) {
                res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.DUPLICATE_VALUES));
            } else  {
                const postDetailCreate = await postService.createPostDetail(contents, introducedPlace, openingHours, closedDays, notice, postId);
                res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_DETAIL_SUCCESS, postDetailCreate));
            }       
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_DETAIL_FAIL));
        }
        next();
    },
    findPostDetail: async (req, res) => {
        const { postId } = req.params;
        try {
            const findPostDetailOne = await postService.findPostDetailIdOne(postId);

            if (!findPostDetailOne) {
                console.log('존재하지 않는 아이디입니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, rm.FIND_POST_DETAIL_SUCCESS, findPostDetailOne));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.FIND_POST_DETAIL_FAIL));
        }
    },

    // PostDetailSelect API
    createPostDetailSelect: async (req, res) => {
        const { title, contents, reservationTime, capacity } = req.body;
        const { postId } = req.params;

        if (!title || !contents || !reservationTime || !capacity || !postId) {
            console.log('필요한 값을 넣지 않았습니다.');
            return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const findPostId = await postService.findPostId(postId);

            if (!findPostId) {
                console.log('원하는 post id값이 없습니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.FIND_POST_ID_FAIL));
            }

            const findPostDetailSelectId = await postService.findPostDetailSelectId(postId);
            if (!findPostDetailSelectId) {
                const postDetailSelectCreate = await postService.createPostDetailSelect(title, contents, reservationTime, capacity, postId);
                res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_DETAIL_SELECT_SUCCESS, postDetailSelectCreate));
            } else {
                res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.DUPLICATE_VALUES));
            }            
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_DETAIL_SELECT_FAIL));
        }
    },
    findPostDetailSelect: async (req, res) => {
        const { postId } = req.params;
            if (!postId) {
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_ID));
            }
        try {
            const findPostDetailSelect = await postService.findPostDetailSelectIdOne(postId);
            if (!findPostDetailSelect) {
                console.log('존재하지 않는 아이디입니다.');
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, rm.FIND_POST_DETAIL_SELECT_SUCCESS, findPostDetailSelect));
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.FIND_POST_DETAIL_SELECT_FAIL));
        }
    },

    // Facilities API
    createFacilities: async (req, res) => {
        const { location: image } = req.file;
        const { contents } = req.body;
        const { postId } = req.params;
    
        if(!contents || !image || !postId) {
            console.log('필요한 값을 넣지 않았습니다.');
            return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const findFacilitiesId = await postService.findPostDetailId(postId);
            let postDetailId = findFacilitiesId.dataValues.id;
            if (findFacilitiesId) {
                const FacilitiesCreate = await postService.createFacilities(image, contents, postDetailId);

                return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_DETAIL_FACILITIES_SUCCESS, FacilitiesCreate));
            } else {
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_ID));
            }
        } catch (err) {
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_DETAIL_FACILITIES_FAIL));
        }
    },

    // Hashtag API
    createHashtag: async (req, res) => {
        const { postId } = req.params;
        const { tag } = req.body;
        
        if (!tag) {
            console.log('필요한 값을 넣지 않았습니다.');
            return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        } 

        try {
            const findPostId = await postService.findPostId(postId);
            if (!findPostId) {
                console.log('원하는 post id값이 없습니다.')
                return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.FIND_POST_ID_FAIL));
            }
            const findPostDetailId = await postService.findPostDetailId(postId);
            let postDetailId = findPostDetailId.dataValues.id;

            const createHashtag = await postService.createHashtag(tag, postDetailId);
            let hashtagId = createHashtag.dataValues.id;

            const createPostHashtag = await postService.createPostHashtag(postId, hashtagId);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_HASHTAG_SUCCESS, createHashtag));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_HASHTAG_FAIL));
        }
    }
}
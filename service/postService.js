const { Post, PostDetail, PostDetailSelect, Hashtag, Facilities, PostDetailImage, PostHashtag } = require('../models');

module.exports = {
    // Post Service
    createPost: async (title, address, price, image, category) => {
        try {
            const createPost = await Post.create({
                title,
                address,
                price,
                postImageUrl: image,
                category
            })
            return createPost;
        } catch (err) {
            throw err;
        }
    },
    readAllPost: async () => {
        try {
            const readAllPost = await Post.findAll({});
            return readAllPost;
        } catch (err) {
            throw err;
        }
    },
    findAllPost: async (category) => {
        try {
            const findAllPost = await Post.findAll({
                where: {
                    category
                },
                include: [{
                    model: Hashtag
                }]
            })
            return findAllPost
        } catch (err) {
            throw err;
        }
    },

    // PostDetail Service

    // POST PostDetail 
    createPostDetail: async (contents, introducedPlace, openingHours, closedDays, notice, postId) => {
        try {
            const createPostDetail = await PostDetail.create({
                contents,
                introducedPlace,
                openingHours,
                closedDays,
                notice,
                PostId: postId
            })
            return createPostDetail;
        } catch (err) {
            throw err;
        }
    },
    findPostId: async (postId) => {
        try {
            const findPostId = await Post.findOne({
                where: {
                    id: postId
                }
            })
            return findPostId
        } catch (err) {
            throw err;
        }
    },

    // POST PostDetailImage  
    createPostDetailImage: async (findPostDetailId, imageUrls) => {
        try {
            const createPostDetailImage = await PostDetailImage.create({
                postImageUrl: imageUrls,
                PostDetailId: findPostDetailId
            })
            return createPostDetailImage;
        } catch (err) {
            throw err;
        }
    },
    findPostDetailId: async (postId) => {
        try {
            const findPostDetailId = await PostDetail.findOne({
                where: {
                    PostId: postId
                }
            })
            return findPostDetailId
        } catch (err) {
            throw err;
        }
    },
    findPostDetailImageId: async (postDetailId) => {
        try {
            const findPostDetailImageId = await PostDetailImage.findOne({
                where: {
                    PostDetailId: postDetailId
                }
            })
            return findPostDetailImageId
        } catch (err) {
            throw err;
        }
    },
    
    // GET PostDetail
    findPostDetailIdOne: async (postId) => {
        try {
            const findPostDetailId = await PostDetail.findOne({
                where: {
                    PostId: postId
                },
                include: [{
                    model: PostDetailImage,
                    attributes: ['postImageUrl']
                }, {
                    model: Facilities,
                    attributes: ['iconImageUrl', 'contents'] 
                }, {
                    model: Post,
                    attributes: { exclude : ['id', 'contents', 'address', 'price', 'postImageUrl', 'category' ]}
                }, {
                    model: Hashtag,
                    attributes: { exclude: ['id', 'PostDetailId']}
                }]
            })
            return findPostDetailId;
        } catch (err) {
            throw err;
        }
    },

    // POST PostDetailSelect
    createPostDetailSelect: async (title, contents, reservationTime, capacity, postId) => {
        try {
            const createPostDetailSelect = await PostDetailSelect.create({
                title,
                contents,
                reservationTime,
                capacity,
                PostId: postId
            })
            return createPostDetailSelect;
        } catch (err) {
            throw err;
        }
    },
    findPostDetailSelectId: async (postId) => {
        try {
            const findPostDetailId = await PostDetailSelect.findOne({
                where: {
                    PostId: postId
                },
                attributes: ['id']
            })
            return findPostDetailId
        } catch (err) {
            throw err;
        }
    },
    findPostDetailSelectIdOne: async (postId) => {
        try {
            const findPostDetailSelectId = await PostDetailSelect.findOne({
                where: {
                    PostId: postId
                }
            })
            return findPostDetailSelectId;
        } catch (err) {
            throw err;
        }
    },

    // POST Facilities
    createFacilities: async (image, contents, postDetailId) => {
        try {
            const createFacilities = await Facilities.create({
                iconImageUrl: image,
                contents,
                PostDetailId: postDetailId
            })
            return createFacilities;
        } catch (err) {
            throw err;
        }
    },

    // POST Hashtag
    createHashtag: async (tag, postDetailId) => {
        try {
            const createHashtag = await Hashtag.create({
                tag,
                PostDetailId: postDetailId
            })
            return createHashtag;
        } catch (err) {
            throw err;
        }
    },
    createPostHashtag: async (postId, hashtagId) => {
        try {
            const createPostHashtag = await PostHashtag.create({
                PostId: postId,
                HashtagId: hashtagId
            })
            return createPostHashtag;
        } catch (err) {
            throw err;
        }
    }
}

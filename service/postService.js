const { Post, PostDetail, PostDetailSelect, Hashtag, Facilities, PostDetailImage } = require('../models');

module.exports = {
    // Post Service
    createPost: async (title, contents, address, price, image, category) => {
        try {
            const createPost = await Post.create({
                title,
                contents,
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

    /* 선택된 공간 조회 API 개발 */
    readAllPostByCategory: async(category) => {
        try {
            const readAllPostByCategory = await Post.findAll({
                where: {
                    category
                },
                attributes: { exclude: ['id'] }
            });
            return readAllPostByCategory;
        } catch (err) {
            throw err;
        }
    },


    // PostDetail Service

    // POST PostDetail 
    createPostDetail: async (introducedPlace, openingHours, closedDays, notice, postId) => {
        try {
            const createPostDetail = await PostDetail.create({
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
                },
                attributes: ['id']
            })
            return findPostDetailId
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
                },
                /* 편의시설 테이블 join해서 출력되게 해주세요!  */
                {
                    model: Post,
                    as: 'hasher',
                    attributes: { exclude : ['id', 'contents', 'address', 'price', 'postImageUrl', 'category' ]}
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
    createFacilities: async (image, contents, postId) => {
        try {
            const createFacilities = await Facilities.create({
                iconImageUrl: image,
                contents,
                PostDetailId: postId
            })
            return createFacilities;
        } catch (err) {
            throw err;
        }
    },
    findFacilitiesId: async (postId) => {
        try {
            const findFacilitiesId = await PostDetail.findOne({
                where: {
                    id: postId
                },
                attributes: ['id']
            })
            return findFacilitiesId
        } catch (err) {
            throw err;
        }
    },

    // POST Hashtag
    createHashtag: async (postId, postDetailId, tag) => {
        try {
            const createHashtag = await Hashtag.create({
                PostId: postId,
                PostDetailId: postDetailId,
                tag
            })
            return createHashtag;
        } catch (err) {
            throw err;
        }
    }

}

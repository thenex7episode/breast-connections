const session = require("express-session");
const axios = require('axios');

module.exports = {
    addPost: (req, res) => {
        // getting data from the frontend
        const { category, title, body } = req.body;
        // argument 4 has to be replaced with the user_id coming from the session
        // console.log(req.session.user)
        const post = [category, title, body, req.session.user.user_id];
        // console.log(body);
        req.app.get('db').addPost(post).then(data => {
            console.log(data[data.length-1])
            const lastID = data[data.length-1].post_id
            let sortedPostssort = data.sort(function(a,b){
                return b.post_id - a.post_id
                });
            // console.log(sortedPostssort)
            res.status(200).json({data: sortedPostssort, lastID: lastID})
        }).catch(error => console.log('error in addPost', error))
    },
    editPost: (req, res) => {
        req.app.get('db').editPost([req.body.title, req.body.body, req.body.post_id]).then(data => {
            res.status(200).send(data)
        })
    },
    addTracker: (req, res) => {
        // getting the tracker value from the Frontend
        const { post_id, tracker } = req.body;
        req.app.get('db').addTracker([post_id,tracker]).then(data => {
            res.status(200).json({data: data});
        }).catch(error => console.log('error in editPost', error))
    },
    deletePost: (req, res) => {
        req.app.get('db').deletePost(req.params.id).then(data => {
            res.status(200).json({data: data})
        }).catch(error => console.log('error in deletePost', error))
    },
    getPosts: (req, res) => {
        req.app.get('db').getPostsForCategory(req.params.id).then(data => {
            // sort Posts from date
            let sortedPostssort = data.sort(function(a,b){
                return b.post_id - a.post_id
                });
            res.status(200).json({data: data})
        }).catch(error => console.log('error in getPosts', error))
    },
    userInfo: (req, res) => {
        console.log(req.params.id)
        req.app.get('db').getUser(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    userData: (req, res) => {
        req.app.get('db').find_user(req.params.username).then(data => {
            res.status(200).send(data)
        })
    },
    addComment: (req, res) => {
        const { body, post_id } = req.body
        req.app.get('db').addComment([body, req.session.user.user_id, post_id]).then(data => {
            let sortedPostssort = data.sort(function(a,b){
                return b.post_id - a.post_id
            });
            res.status(200).send(sortedPostssort)
        })
    },
    editComment: (req, res) => {
        const { comment_id, body } = req.body;
        req.app.get('db').editComment([comment_id, body]).then(data => {
            res.status(200).send(data)
        })
    },
    deleteComment: (req, res) => {
        req.app.get('db').deleteComment([req.params.id, req.params.post]).then(data => {
            res.status(200).send(data)
        })
    },
    getComments: (req, res) => {
        req.app.get('db').getComments(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    getAllPosts: (req,res) => {
        req.app.get('db').getAllPosts().then(data => {
            let sortedPostssort = data.sort(function(a,b){
                return b.post_id - a.post_id
                });
            res.status(200).send(sortedPostssort)
        })
    },
    getGoogleResults: (req, res) => {
        const { tags, cords, radius } = req.body;
        console.log(cords, tags)
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${cords.lat},${cords.lng}&radius=${radius}&type=${tags}&key=AIzaSyDP2xc5L8pWjHE2vgmIRDCK-834Q2eGA0A`).then(data => {
            console.log(data.data.next_page_token)
            let reducedList = data.data.results.map(el => {
                return {
                    name: el.name,
                    place_id: el.place_id,
                    types: el.types,
                    adress: el.vicinity,
                    rating: el.rating,
                    photos: el.photos
                }
            })
            res.status(200).json({results: reducedList, next_page_token: data.data.next_page_token})
        })
    },
    getGoogleNextPage: (req, res) => {
        const { token } = req.params;
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&pagetoken=${token}&key=AIzaSyDP2xc5L8pWjHE2vgmIRDCK-834Q2eGA0A`).then(data => {
            console.log(data.data.next_page_token)
            let reducedList = data.data.results.map(el => {
                return {
                    name: el.name,
                    place_id: el.place_id,
                    types: el.types,
                    adress: el.vicinity,
                    rating: el.rating,
                    photos: el.photos
                }
            })
            res.status(200).json({results: reducedList, next_page_token: data.data.next_page_token})
        })
    },
    getGoogleImage: (req, res) => {
        axios.get(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${req.params.ref}&key=AIzaSyDP2xc5L8pWjHE2vgmIRDCK-834Q2eGA0A&maxwidth=400&maxheight=400`).then(data => {
            res.status(200).send(data.request.socket._httpMessage._redirectable._options.href)
        })
    },
    addExperience: (req, res) => {
        req.app.get('db').addExperience([req.body.body, req.session.user.user_id, req.body.place_id, req.body.rating]).then(data => {
            res.status(200).send(data)
        }).catch(err => console.log('Error in add Experience', err))
    },
    deleteExperience: (req, res) => {
        console.log([req.params.eid, req.params.pid])
        req.app.get('db').deleteExperience([req.params.eid, req.params.pid]).then(data => {
            res.status(200).send(data)
        }).catch(err => console.log('Error in delete Experience', err))
    },
    getExperiences: (req, res) => {
        req.app.get('db').getExperiences(req.params.id).then(data => {
            res.status(200).send(data)
        }).catch(err => console.log('Error in add Experience', err))
    },
    editProfile: (req,res) => {
        console.log('req----------', req.params.username, req.body.body, req.body.image)
          req.app.get('db').editProfile([req.params.username, req.body.body, req.body.image]).then(data => {
              res.status(200).send(data)
          })
    },
    // getUserPosts: (req,res) => {
    //     req.app.get('db').join(req.params.user_id).then(posts => {
    //         res.json({posts: posts})
    //     }).catch(err => {console.log('WEEEWOOOWEEEWOOO', err)})
    // }

      editProfile: (req,res) => {
        //   console.log('req----------', req.params.username, req.body.body, req.body.image)
            req.app.get('db').editProfile([req.params.username, req.body.body, req.body.image]).then(data => {
                res.status(200).send(data)
            })
      },
      deleteUser: (req, res) => {
          req.app.get('db').deleteUser(req.params.user_id).then(data => {
              res.status(200).send(data)
          })
      },
      getUserPosts: (req,res) => {
          req.app.get('db').getUserPosts(req.params.user_id).then(data => {
              res.status(200).send(data)
          }).catch(error => {
              console.log('error in getUserPosts:' , error)
            })
        },
              addLike: (req, res) => {
                  req.app.get('db').addLike([req.body.user_id, req.body.post_id]).then(data => {
                      res.status(200).send(data)

                  })
                },
      
      
        getLikes: (req, res) => {
          req.app.get('db').getLikes(req.params.post_id).then(data => {
              console.log(data);
              let likes = data.map(el => el.user_id)
              res.status(200).send(likes)
          })
      },
      getProducts: (req,res) => {
          req.app.get('db').getProducts().then(data => {
              res.status(200).send(data)
          })
      },
      newProduct: (req, res) => {
          const {item_name, description, username, imageurl} = req.body
          req.app.get('db').createProduct([item_name, description, username, imageurl]).then(data => {
            res.status(200).send(data)
          })
      },
      deleteProduct: (req, res) => {
          req.app.get('db').deleteProduct(req.params.id).then(data => {
              res.status(200).send(data)
          })
      },
      editProduct: (req, res) => {
          console.log(req.body)
          req.app.get('db').editProduct([req.params.id, req.body.product, req.body.description]).then(data => {
              res.status(200).send(data)
          })
      },
      getProductById: (req, res) => {
          req.app.get('db').getProductById(req.params.id).then(data => {
              res.status(200).send(data)
          })
      },
      getProductByUsername: (req,res) => {
          req.app.get('db').getProductByUsername(req.params.username).then(data => {
            //   console.log('data in username',data)
              res.status(200).send(data)
          })
      }
}

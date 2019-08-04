const request = require('supertest')
const should = require('should')
const app = require('../../index')
const models = require('../../models')

describe('GET /users', ()=>{
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Chris'}]
    before(()=>models.sequelize.sync({force: true}))
    before(()=>models.User.bulkCreate(users))

    describe('Success Test', ()=>{
        it('Return array', (done)=>{
            request(app)
                .get('/users')
                .end((err, res)=>{
                    res.body.should.be.an.instanceOf(Array)
                    res.body.forEach(user => {
                        user.should.have.property('name')
                    })
                    done()
                });
        })
    
        it('Max limit', (done)=>{
            request(app)
                .get('/users?limit=2')
                .end((err, res)=>{
                    res.body.should.have.lengthOf(2)
                    done()
                })
        })
    })

    describe('Error Test', ()=>{
        it('If limit is not Int type, return 400', (done)=>{
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end((err, res)=>{
                    done()
                })
        })
    })

})

describe('GET /users/:id', ()=>{
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Chris'}]
    before(()=>models.sequelize.sync({force: true}))
    before(()=> models.User.bulkCreate(users))

    describe('Success Test', ()=>{
        it('Return User id:1 object', (done)=>{
            request(app)
                .get('/users/1')
                .end((err, res)=>{
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    })

    describe('Error Test', ()=>{
        it('Id is not int type', (done)=>{
            request(app)
                .get('/users/one')
                .expect(400)
                .end((err, res)=>{
                    done()
                })
        })

        it('Not Found', (done)=>{
            request(app)            
                .get('/users/9')
                .expect(404)
                .end((err, res)=>{
                    done()
                })
        })
    })
})

describe('DELETE /users/:id', ()=>{
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Chris'}]
    before(()=>models.sequelize.sync({force: true}))
    before(()=>models.User.bulkCreate(users))

    describe('Success Test', ()=>{
        it('Response 204', (done)=>{
            request(app)
                .delete('/users/3')
                .expect(204)
                .end((err, res)=>{
                    done()
                })
        })
    })

    describe('Error Test', ()=>{
        it('Id is not int type', (done)=>{
            request(app)
                .delete('/users/three')
                .expect(400)
                .end((err, res)=>{
                    done()
                })
        })
    })
})

describe('POST /users', ()=>{
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Chris'}]
    before(()=>models.sequelize.sync({force: true}))
    before(()=>models.User.bulkCreate(users))

    describe('Success Test', ()=>{
        let name = 'Daniel', body
        before((done)=>{
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res)=>{
                    body = res.body
                    done()
                })
        })

        it('Return Created User', ()=>{
            body.should.have.property('id')
        })
        it('Return name', ()=>{
            body.should.have.property('name', name)
        })
    })

    describe('Error Test', ()=>{
        it('If not contain name param', (done)=>{
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })        

        it('Confilct name', (done)=>{
            request(app)
                .post('/users')
                .send({name:'Daniel'})
                .expect(409)
                .end(done)

        })
    })
})

describe('PUT /users/:id', ()=>{
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Chris'}]
    before(()=>models.sequelize.sync({force: true}))
    before(()=> models.User.bulkCreate(users))
    
    describe('Success Test', ()=> {
      it('Response Changed name', (done)=> {
        const name = 'Chally'
        request(app)
            .put('/users/3')
            .send({name})
            .end((err, res) =>{
              res.body.should.have.property('name', name)
              done()
            })
      })
    })

    describe('Error Test', ()=>{
      it('Id is not int type', done=>{
        request(app)
            .put('/users/one')
            .expect(400)
            .end(done)
      })

      it('Name is not included', done=>{
        request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done)
      })

      it('Not found user', done=>{
        request(app)
            .put('/users/9')
            .send({name: 'test'})
            .expect(404)
            .end(done)
      })
      
      it('Name is conflict', done=>{
        request(app)
            .put('/users/3')
            .send({name: 'Bob'})
            .expect(409)
            .end(done)
      })
    })
  })
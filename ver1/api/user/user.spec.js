const request = require('supertest')
const should = require('should')
const assert = require('assert')
const app = require('../../index')

describe('GET /users', ()=>{
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
        it('If limit is not int type, return 400', (done)=>{
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
    describe('Success Test', ()=>{
        it('Return User object', (done)=>{
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
    describe('Success Test', ()=>{
        it('Response 201', (done)=>{
            request(app)
                .post('/users')
                .send({name:'Daniel'}) //post, put 같은 경우 이걸 사용
                .expect(201)
                .end((err, res)=>{
                    res.body.should.have.property('name', 'Daniel')
                    done()
                })
        })
    })

    describe('Error Test', ()=>{
        it('If not in here', (done)=>{
            request(app)
                .post('/users').send({})
                .expect(400)
                .end(done)
        })        

        it('Confilct name', (done)=>{
            request(app)
                .post('/users')
                .send({name:'Alice'})
                .expect(409)
                .end(done)

        })
    })
})
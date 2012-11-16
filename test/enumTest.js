var expect = expect || require('expect.js')
  , e = this.Enum || require('../index');

describe('Enum', function() {

    if (typeof(module) !== 'undefined' && module.exports) {
        describe('calling register', function() {

            it('it should register Enum on global namespace', function() {

                expect(global.Enum).not.to.be.ok();
                e.register();
                expect(Enum).to.be.ok();

            });

        });
    }

    describe('defining a simple enum', function() {

        var myEnum;

        describe('in a simple or complex way', function() {

            it('it should be tha same', function() {

                myEnum = new e(['A', 'B', 'C']);

                var myEnum2 = new e({'A': 1, 'B': 2, 'C': 4});

                expect(myEnum.A).to.eql(myEnum2.A);
                expect(myEnum.C).to.eql(myEnum2.C);

                expect(myEnum.A.value).to.eql(myEnum2.A.value);
                expect(myEnum.C.value).to.eql(myEnum2.C.value);

            });

            describe('it should be possible to', function() {

                it('get an enum item', function() {

                    expect(myEnum.A).to.have.property('value', 1);
                    expect(myEnum.A).to.have.property('key', 'A');

                    expect(myEnum.C).to.have.property('value', 4);
                    expect(myEnum.C).to.have.property('key', 'C');

                });

                describe('call has', function() {

                    describe('on a flagged enum item', function() {

                        var myItem;

                        before(function() {
                            myItem = myEnum.get(3);
                            expect(myEnum.get('A | B').value).to.eql(myItem.value);
                        });

                        it('with another item', function() {

                            expect(myItem.has(myEnum.B)).to.be.ok();
                            expect(myItem.has(myEnum.C)).not.to.be.ok();

                        });

                        it('with another key', function() {

                            expect(myItem.has('B')).to.be.ok();
                            expect(myItem.has('C')).not.to.be.ok();

                        });

                        it('with another value', function() {

                            expect(myItem.has(2)).to.be.ok();
                            expect(myItem.has(4)).not.to.be.ok();

                        });

                    });

                });

                describe('compare', function() {

                    describe('an item and an item', function() {

                        it('with is', function() {

                            expect(myEnum.A.is(myEnum.A)).to.be.ok();
                            expect(myEnum.C.is(myEnum.C)).to.be.ok();

                        });

                        it('with has', function() {

                            expect(myEnum.A.has(myEnum.A)).to.be.ok();
                            expect(myEnum.C.has(myEnum.C)).to.be.ok();

                        });

                        it('with ==', function() {

                            expect(myEnum.A == myEnum.A).to.be.ok();
                            expect(myEnum.C == myEnum.C).to.be.ok();

                        });

                        it('with ===', function() {

                            expect(myEnum.A === myEnum.A).to.be.ok();
                            expect(myEnum.C === myEnum.C).to.be.ok();

                        });

                    });

                    describe('an item and a key', function() {

                        it('with is', function() {

                            expect(myEnum.A.is('A')).to.be.ok();
                            expect(myEnum.C.is('C')).to.be.ok();

                        });

                        it('with has', function() {

                            expect(myEnum.A.has('A')).to.be.ok();
                            expect(myEnum.C.has('C')).to.be.ok();

                        });

                        it('with ==', function() {

                            expect(myEnum.A == 'A').to.be.ok();
                            expect(myEnum.C == 'C').to.be.ok();

                        });

                    });

                    describe('an item and a value', function() {

                        it('with is', function() {

                            expect(myEnum.A.is(1)).to.be.ok();
                            expect(myEnum.C.is(4)).to.be.ok();

                        });

                        it('with has', function() {

                            expect(myEnum.A.has(1)).to.be.ok();
                            expect(myEnum.C.has(4)).to.be.ok();

                        });

                    });

                });                

                describe('call get and get', function() {

                    it('get an enum item by item', function() {

                        expect(myEnum.get(myEnum.A)).to.have.property('value', 1);
                        expect(myEnum.get(myEnum.A)).to.have.property('key', 'A');

                        expect(myEnum.get(myEnum.C)).to.have.property('value', 4);
                        expect(myEnum.get(myEnum.C)).to.have.property('key', 'C');

                    });

                    it('an enum item by value', function() {

                        expect(myEnum.get('A')).to.have.property('value', 1);
                        expect(myEnum.get('A')).to.have.property('key', 'A');

                        expect(myEnum.get('C')).to.have.property('value', 4);
                        expect(myEnum.get('C')).to.have.property('key', 'C');

                    });

                    it(' an enum item by key', function() {

                        expect(myEnum.get(1)).to.have.property('value', 1);
                        expect(myEnum.get(1)).to.have.property('key', 'A');

                        expect(myEnum.get(4)).to.have.property('value', 4);
                        expect(myEnum.get(4)).to.have.property('key', 'C');

                    });

                });

                describe('call getValue and get', function() {

                    it('an enum value by item', function() {

                        expect(myEnum.getValue(myEnum.A)).to.eql(1);

                        expect(myEnum.getValue(myEnum.C)).to.eql(4);

                    });

                    it('an enum value by key', function() {

                        expect(myEnum.getValue('A')).to.eql(1);

                        expect(myEnum.getValue('C')).to.eql(4);

                    });

                    it('an enum value by value', function() {

                        expect(myEnum.getValue(1)).to.eql(1);

                        expect(myEnum.getValue(4)).to.eql(4);

                    });

                });

                describe('call getKey and get', function() {

                    it('an enum key by item', function() {

                        expect(myEnum.getKey(myEnum.A)).to.eql('A');

                        expect(myEnum.getKey(myEnum.C)).to.eql('C');

                    });

                    it('an enum value by key', function() {

                        expect(myEnum.getKey('A')).to.eql('A');

                        expect(myEnum.getKey('C')).to.eql('C');

                    });

                    it('an enum value by value', function() {

                        expect(myEnum.getKey(1)).to.eql('A');

                        expect(myEnum.getKey(4)).to.eql('C');

                    });

                });

            });

            describe('on an enum item it should be possible to', function() {

                it('call toString and get the key', function() {

                    expect(myEnum.A.toString()).to.eql('A');

                });

                it('call toJSON and get the key', function() {

                    expect(myEnum.A.toJSON()).to.eql('A');

                });

                it('call valueOf and get the key', function() {

                    expect(myEnum.A.valueOf()).to.eql('A');

                });

            });

        });

    });

});
import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';
describe.only('hw2', () => {
  let facebookHelper = null;
  let friends = [];
  let model = null;

  before(async (done) => {
    let userId = "618444968267382";
    let token = "EAACEdEose0cBAJlP7o2lFIHXwunjWMYVAvuvCGLkd8GkBIHqoRowECrZByeYxIz4dheceT7bZBxZBlvMukZAtjtGbJXUfCj1YZCTgU77LwMy4gmz8dusod6AK2BhUZBe0XjqV2kKYXcNUBhnkkjDupAD8YAETPZB3LTpj9lWiQruLVzOmDhAypuSVlq4aVozQMZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    try{
    model = await task1_initModel()
  }catch(e){done(e)}

    done();
  });


  it("get friends list and save", async (done) => {
    try {
      friends = await facebookHelper.getFriends();
      console.log("friends", friends);

      friends.should.be.Array;
      let result = await model.User.bulkCreate(friends);

      console.log("已新增至資料庫");

      for(var i=0;i<friends.length;i++){
        result[i].name.should.be.eq(friends[i].name);
      }

      done();
    } catch (e) {
      done(e);
    }
  });

  it("原本用 api 取得 friends list 改為透過查詢資料庫的方式", async (done) => {
    try {
      let fb_friends = await model.User.findAll();
      console.log("取得資料庫內的朋友清單");

      //檢查是否一樣

        fb_friends.length.should.be.eq(friends.length);


      done();
    } catch (e) {
      done(e);
    }
  });

  it("將其中一個 friend 更新其 email 欄位為 hellojs@trunk.studio", async (done) => {
    try {
      let f = await model.User.findOne({
        where:{
          name:friends[1].name
        }
});
      console.log("要更改的人的資料",f.name,f.email,f.id);
      f.email = 'hellojs@trunk.studio';
      await f.save();

      f.email.should.be.eq('hellojs@trunk.studio');



      done();
    } catch (e) {
      done(e);
    }
  });

  it("刪除一位 friend", async (done) => {
    try {
      let f = await model.User.findOne({
        where:{
          name:friends[1].name
        }
      });
      console.log("要刪除的人的資料",f.name,f.email,f.id);
      await f.destroy();

      let check = await model.User.findOne({//檢查是否已經刪除
        where:{
          name:friends[1].name
        }
      });

      (check == null).should.be.true;

      done();
    } catch (e) {
      done(e);
    }
  });



});

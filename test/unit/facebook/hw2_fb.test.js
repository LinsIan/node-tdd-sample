import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';
describe('facebook-helper', () => {
  let facebookHelper = null;
  let friends = [];
  let model = null;

  before(async (done) => {
    let userId = "618444968267382";
    let token = "EAACEdEose0cBAARvaZAoWcNHD8WeTgxgohMI0enyVAAQjaVmH2snfS6Hd9u3hrkrldoi6wZAtLKuPc56ZA3JZBSmYwD3QiP29Ge7zgtliO9CiISS2zm6mJoWqB7l3hUFvjcr49oXzLAmG8lLIpmrhWVkWXZApV5cfPCfIARlpEUqIgx6CKEcTZA9ElznyfGLwZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    try{
    model = await task1_initModel()
  }catch(e){done(e)}

    done();
  });


  it.only("get friends list and save", async (done) => {
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

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});

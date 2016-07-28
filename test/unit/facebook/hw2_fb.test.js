import FacebookHelper from '../../../src/facebook/helper.js'

describe('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "616705558438326";
    let token = "EAACEdEose0cBAARvaZAoWcNHD8WeTgxgohMI0enyVAAQjaVmH2snfS6Hd9u3hrkrldoi6wZAtLKuPc56ZA3JZBSmYwD3QiP29Ge7zgtliO9CiISS2zm6mJoWqB7l3hUFvjcr49oXzLAmG8lLIpmrhWVkWXZApV5cfPCfIARlpEUqIgx6CKEcTZA9ElznyfGLwZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  it("get friends list and save", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
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

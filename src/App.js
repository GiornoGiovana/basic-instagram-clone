import { useEffect, useReducer, useState } from "react";
import { SuperHero } from "./SuperHeroContext";
import { getRandomId } from "./util";
import { Header } from "./components/Header";
import { Posts } from "./components/Posts";
import { Sidebar } from "./components/Sidebar";
import { Stories } from "./components/Stories";
import { UploadPost } from "./components/UploadPost";
import { db } from "./firebase";

const initialState = {
  hero: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set-hero":
      return { hero: action.payload };
  }
};

function App() {
  const [superHero, dispatch] = useReducer(reducer, initialState);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getSuperHero() {
      const heroId = getRandomId();
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${heroId}.json`
      );
      if (response.status === 200) {
        const data = await response.json();
        const { id, name, slug, images } = data;
        return [id, name, slug, images];
      }
      return new Error("Fail fetching data, reload page pls");
    }

    getSuperHero()
      .then((heroData) => {
        const [id, name, slug, images] = heroData;
        const hero = {
          id,
          name,
          slug,
          image: images.sm,
        };
        dispatch({ type: "set-hero", payload: hero });
      })
      .catch((e) => alert(e.message));
  }, []);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="bg-gray-50 ">
      <SuperHero.Provider value={{ superHero, dispatch }}>
        <Header />
        <main className="flex m-auto pt-7 max-w-4xl">
          <div className="lg:mr-7 max-w-xl overflow-hidden">
            <Stories />
            <div className="sm:hidden mb-6">
              <UploadPost />
            </div>
            <Posts posts={posts} />
          </div>
          <Sidebar />
        </main>
      </SuperHero.Provider>
    </div>
  );
}

export default App;

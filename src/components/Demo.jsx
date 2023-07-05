import { useEffect, useState } from "react";
import { linkIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
    });

    // Preguntamos por si el fetch resultó exitoso
    if (data?.summary) {
      // Si es asi lo guardamos para poder usarlo
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);

      // Tambien lo almacenamos en local
      localStorage.setItem("article", JSON.stringify(updatedAllArticles));

    } else {
      console.error("No funcionó");
    }
  };

  //Verificamos si hay datos almacenados en el local
  useEffect(() => {
    const articleLocalStorage = JSON.parse(localStorage.getItem("article"));
    if(articleLocalStorage) {
      setAllArticles(articleLocalStorage);
    }
  }, []);

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            className="url_input peer"
            placeholder="Pass the article link"
            required
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-600"
          >
            Go
          </button>
        </form>
      </div>
    </section>
  );
};

export default Demo;

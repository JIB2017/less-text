import { useEffect, useState } from "react";
import { linkIcon, loader, copy, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

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
      const updatedAllArticles = [...allArticles, newArticle];
      setAllArticles(updatedAllArticles);

      // Tambien lo almacenamos en local
      localStorage.setItem("article", JSON.stringify(updatedAllArticles));
    } else {
      console.error("No funcionó");
    }
  };

  const handleCopy = (e) => {
    setCopied(e);
    navigator.clipboard.writeText(e);
    setTimeout(() => setCopied(false), 3000);
  }

  //Verificamos si hay datos almacenados en el local
  useEffect(() => {
    const articleLocalStorage = JSON.parse(localStorage.getItem("article"));
    if (articleLocalStorage) {
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
      {/* Aquí va el historial */}
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {allArticles.map((item, key) => (
          <div key={key} className="link_card">
            <div className="copy_btn" onClick={() => {handleCopy(item.url)}}>
              <img
                src={copied === item.url ? tick : copy}
                alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <p className="flex font-satoshi font-medium text-sm text-blue-700 truncate">
              {item.url}
            </p>
          </div>
        ))}
      </div>
      {/* Aquí va el resultado final */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20"/>
        ) : error ? (
          <div>
            <p>A ocurrido un error inesperado</p><br />
            <span>
              {error?.data?.error}
            </span>
          </div>
        ) : (
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;

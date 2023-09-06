import { message } from "antd";
import { useEffect, useState } from "react";
import SiteContext from "./SiteContext";
import siteService from "../../services/siteService";

const SiteState = ({ children }) => {
  const [siteRecipes, setSiteRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [siteRecipe, setSiteRecipe] = useState({});

  const fetchSiteAllRecipes = async () => {
    try {
      const result = await siteService.all();
      const data = result?.data?.data;
      setSiteRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    }
  };

  const fetchSiteSingleRecipe = async (values) => {
    try {
      const result = await siteService.single(values);
      const data = result?.data?.data;
      setSiteRecipe(data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchSiteAllRecipes();
  }, []);

  useEffect(() => {
    if (siteRecipes.data.length !== 0) {
      const randomRecipe = siteRecipes?.data[Math.floor(Math.random() * 10)];
      fetchSiteSingleRecipe(randomRecipe._id);
    }
  }, [siteRecipes.data.length]);

  return (
    <SiteContext.Provider
      value={{
        siteRecipes,
        siteRecipe,
        fetchSiteAllRecipes,
        fetchSiteSingleRecipe,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteState;
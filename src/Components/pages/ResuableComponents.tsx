import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  topcategories,
  RecentlyAdded,
  TrendingData,
  // userSearchGetData,
  // searchFilterPost,
  discoverMyInterests,
} from "../../redux/action/userAction";

import { AppDispatch } from "../../redux/store";
import ComponentHeader from "./Component_Header";
import ComponentFooter from "./Component_Footer";
import ComponentNavbar from "./componentNavbar";
import { useStore } from "../../Hooks/useStore";
import { observer } from "mobx-react-lite";
function ResuableComponents() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    rootStore: { techSearchstore },
  } = useStore();
  const { categories } = useSelector((state: any) => state?.topcategories);
  const { Recentlydata } = useSelector((state: any) => state?.RecentlyAdded);
  const { Trendingdata } = useSelector((state: any) => state?.TrendingData);
  console.log(techSearchstore,"techSearchstore---->")
  const [searchWord, setSearchWord] = useState<any>(null);
  const [searchbarErr, setSearchbarErr] = useState<any>({});
  const { discoverMyInterestsData } = useSelector(
    (state: any) => state?.discoverMyInterests
  );
  const dataObj = {
    from: null,
    to: null,
    feature_tags: null,
    search: searchWord,
    functional_tags: null,
    techstack: null,
    author: null,
  };
  const handleSearch = () => {
    const searchbarErrr = {} as any;
    if (searchWord == null) {
      searchbarErrr.searchBlank = "Please enter text here";
      setSearchbarErr(searchbarErrr);
    } else {
      navigate(`/Search_list/${searchWord}`);
      // dispatch((searchWord));
      techSearchstore.fetchtechStackList(searchWord)
      // dispatch(searchFilterPost(dataObj));
      techSearchstore.fetchseacrchFilterpost(dataObj)
    }
  };


  useEffect(() => {
    document.body.className = "app bg-light";
    dispatch(topcategories(10));
    dispatch(RecentlyAdded());
    dispatch(TrendingData());
    dispatch(discoverMyInterests());
  }, [dispatch]);

  // Load More For Recently Added

  const datanumber = 3;
  const [noOfComponent, setNoOfComponent] = useState(datanumber);
  const RecentlyAddedData = Recentlydata?.payload?.slice(0, noOfComponent);
  const loadMore = () => {
    setNoOfComponent(noOfComponent + datanumber);
  };

  // Load More For discoverMyInterestsNo Added

  const discoverMyInterestsNo = 5;
  const [noOfDiscoverComponent, setNoOfDiscoverComponent] = useState(
    discoverMyInterestsNo
  );
  const loadData: any = discoverMyInterestsData?.payload?.result?.slice(
    0,
    noOfDiscoverComponent
  );

  const loadDiscovertInterestData = () => {
    setNoOfDiscoverComponent(noOfDiscoverComponent + discoverMyInterestsNo);
  };

  return (
    <Fragment>
      <div className="app bg-light">
        <header>
          <ComponentHeader />

          <div className="nav-scroller bg-blue shadow-sm">
            <ComponentNavbar />
          </div>
        </header>
        {/* <!-- Main container --> */}
        <main>
          <section>
            <div className="banner_wrapper">
              <div className="flex_wrapper">
                <div className="container container-lg">
                  <h1>GET THE RIGHT REUSABLE COMPONENT</h1>
                  <p>
                    Expedite your development or enhance your existing
                    application with a set of modular, easy to scale, consistent
                    and tested components, publish, discover and use development
                    components throughout the organization.
                  </p>
                  <form onSubmit={handleSearch}>
                    <div className="search_block ">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by tech stack, component name or functional use"
                          onChange={(e: any) => setSearchWord(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleSearch}
                          >
                            <i className="las la-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {Object.keys(searchbarErr).map((err: any) => {
                    return (
                      <div className="invalid-feedback">
                        {searchbarErr[err]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- End Banner Section --> */}
          <section className="section_wrapper">
            <div className="container container-lg">
              <div className="title_wrapper text-center mb-5">
                <h2>Trending on marketplace</h2>
                <p>
                  Check what’s popular on Rishabh and make your project look
                  trendy and professional.
                </p>
              </div>
              <div className="card_wrapper">
                {Trendingdata?.payload?.map((data: any) => {
                  return (
                    <div className="card card-boxshadow">
                      <div className="card_head mb-2">
                        <div className="card_icon">
                          <img src={data?.image_url} alt="Technology" />
                        </div>
                        <div className="cardhead_info">
                          <h4 className="card_title">
                            {" "}
                            <Link to={`/View_Component/${data?.id}`}>
                              {data?.name}
                            </Link>
                          </h4>
                          <div className="cardsub_title">
                            {data?.techstack.name}
                          </div>
                        </div>
                      </div>
                      <div className="card_body card_pl">
                        <p className="text-ellipsis--2 mb-2">
                          {data?.description}
                        </p>
                        <div className="date_lable">
                          {" "}
                          {moment(data?.createdAt).utc().format("MMM DD,YYYY")}
                        </div>
                      </div>
                      <div className="card_footer ">
                        <div className="card_footer_rt">
                          <div className="card_label mr-3">
                            <i className="ra ra-eye_open"></i> {data?.views}
                          </div>
                          <div className="card_label ">
                            <i className="ra ra-download"></i> {data?.downloads}
                          </div>
                        </div>
                        <div className="card_label_auth">
                          {data?.author_name} on
                          {moment(data?.createdOn).utc().format("MMM DD,YYYY")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="section_wrapper bg_white">
            <div className="container container-lg">
              <div className="card_wrapper">
                <div className="card card-boxshadow">
                  <div className="card_title">
                    <div className="cardtitle_lt">
                      {" "}
                      <h3>Recently Added</h3>
                    </div>
                    <div className="cardtitle_rt"></div>
                  </div>
                  <div className="card_list">
                    <ul>
                      {RecentlyAddedData?.map((data: any) => {
                        return (
                          <li>
                            <div className="cardlist_box">
                              <div className="card_head mb-2">
                                <div className="card_icon">
                                  <img
                                    src={data?.image_url}
                                    className="img-sm"
                                    alt="Technology"
                                  />
                                </div>
                                <div className="cardhead_info">
                                  <h5 className="card_title">
                                    {" "}
                                    <Link to={`/View_Component/${data?.id}`}>
                                      {data?.display_name}
                                    </Link>
                                  </h5>
                                  <div className="cardsub_title">
                                    {data?.techstack?.name}
                                  </div>
                                </div>
                              </div>
                              <div className="card_body">
                                <p className="text-ellipsis--2 mb-2">
                                  {data?.description}
                                </p>
                                <div className="date_lable">
                                  {moment(data?.createdAt)
                                    .utc()
                                    .format("MMM DD,YYYY")}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {Recentlydata?.payload?.length > noOfComponent ? (
                    <div className="d-flex align-items-center justify-content-center py-4">
                      <Link to="/reusableComponent" onClick={loadMore}>
                        Load More
                      </Link>
                    </div>
                  ) : null}
                </div>
                <div className="card card-boxshadow">
                  <div className="card_title">
                    <div className="cardtitle_lt">
                      {" "}
                      <h3>Discover Your Interest</h3>
                    </div>
                    <div className="cardtitle_rt"></div>
                  </div>
                  <div className="card_list ">
                    <ul>
                      {loadData?.map((data: any) => {
                        return (
                          <Fragment>
                            <li>
                              <div className="cardlist_box cardlist_flex">
                                <div className="card_head mb-2">
                                  <div className="card_icon">
                                    <img
                                      src={data?.avatar_url}
                                      className="img-sm"
                                      alt="Technology"
                                    />
                                  </div>
                                  <div className="cardhead_info">
                                    <h5 className="card_title">
                                      {" "}
                                      <Link to={`/Search_list/${data?.name}`}>
                                        {data?.name}
                                      </Link>
                                    </h5>
                                    <p className="text-ellipsis--1">
                                      {data?.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="card_action">
                                  <Link
                                    to={`/Search_list/${data?.name}`}
                                    className="btn btn-outline-primary btn-sm btn-round"
                                  >
                                    Get{" "}
                                    <i className="las la-arrow-right ml-2 mr-0"></i>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                  {discoverMyInterestsData?.payload?.result?.length >
                  noOfDiscoverComponent ? (
                    <div className="d-flex align-items-center justify-content-center py-4">
                      <Link
                        to="/reusableComponent"
                        onClick={loadDiscovertInterestData}
                        // className="btn btn-outline-primary"
                      >
                        Load More
                      </Link>
                    </div>
                  ) : null}
                </div>
                <div className="card card-boxshadow card_blue_bg card_pattern">
                  <div className="card_title">
                    <div className="cardtitle_lt">
                      {" "}
                      <h3 className="text_white">Top Categories</h3>
                    </div>
                    <div className="cardtitle_rt"></div>
                  </div>
                  <div className="card_list list_noborder">
                    <ul>
                      {categories?.payload?.map((data: any) => {
                        return (
                          <li>
                            <div className="cardlist_box cardlist_flex mb-1">
                              <div className="card_lt text_white">
                                {data?.name}
                              </div>
                              <div className="card_rt text_white">
                                {data?.total_components}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <!-- Footer --> */}
        <ComponentFooter />
      </div>
    </Fragment>
  );
}

export default observer(ResuableComponents);

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Component_Footer from "./Component_Footer";
import Component_Header from "./Component_Header";
import star5 from "../../images/5star.svg";
import star4 from "../../images/4star.svg";
import star3 from "../../images/3star.svg";
import star2 from "../../images/2star.svg";
import star1 from "../../images/1star.svg";
import noStar from "../../images/nostar.svg";
import {
  addRemoveFevorites,
  searchFilterPost,
} from "../../redux/action/userAction";
import { AppDispatch } from "../../redux/store";
import { toast, ToastContainer } from "react-toastify";
import { roleName } from "./auth/authUser";
import { Permissions } from "../../constants/PermissionConstant";
import { useStore } from "../../Hooks/useStore";

function Search_List() {
  const {
    rootStore: { techSearchstore },
  } = useStore();
 
  const dispatch = useDispatch<AppDispatch>();

  const datanumber = 3;
  const todayDate = new Date();
  // const { userSearchData } = useSelector((state: any) => state?.userSearchData);                                 
  const { userSearchfilterData } = useSelector(
    (state: any) => state?.userSearchfilterData
  );
  let searchWord = useParams();
 console.log(techSearchstore?.searchFilterPost?.payload)
  const postedWithinArr = ["A Week", "A Month", "6 Months", "1 Year", "Custom"];

  const [search, setSearch] = useState(null);
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [techStack, setTechStack] = useState<any>([]);
  const [functionalUse, setFunctionalUse] = useState<any>([]);
  const [feature, setFeature] = useState<any>([]);
  const [author, setAuthor] = useState<any>([]);
  const [filterArr, setFilterArr] = useState<any>([]);
  const [noOfComponent, setNoOfComponent] = useState(datanumber);
  const [favIcon, setFavIcon] = useState(false);
  const [customFlag, setCustomFlag] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [postedWithin, setPostedWithin] = useState(false);
  const [rating, setRating] = useState<any>([]);

  const loadMore = () => {
    setNoOfComponent(noOfComponent + datanumber);
  };
 
  // const SearchData = userSearchfilterData?.payload?.slice(0, noOfComponent);
  const SearchData = techSearchstore?.searchFilterPost?.payload?.slice(0,noOfComponent)
  console.log(SearchData,"SearchData--->")
  const handleRating = (e: any) => {
    let dataRating = rating;

    if (e.target.checked) {
      dataRating.push(parseInt(e?.target?.value));
    } else {
      var indexRating = dataRating.indexOf(parseInt(e?.target?.value));
      dataRating.splice(indexRating, 1);
    }
    // if (e.target.checked) {
    //   setRatings([...ratings, parseInt(e?.target?.value)]);
    //   // setFilterArr([...filterArr, e?.target?.name]);
    // } else {
    //   // var tempFind = filterArr.filter((value: any) => value !== e?.target?.name);
    //   // setFilterArr(tempFind);
    //   var tempFind1 = ratings.filter((value: any) => value !== parseInt(e?.target?.value));
    //   setRatings(tempFind1);
    // }

    // dispatch(
    //   searchFilterPost({
    //     search: search === null ? searchWord.SeachWord : search,
    //     from: null,
    //     to: null,
    //     author: null,
    //     techstack: null,
    //     functions: null,
    //     feature: null,
    //     sortby: null,
    //     rating: dataRating,
    //   })
    // );
    techSearchstore.fetchseacrchFilterpost({
      search: search === null ? searchWord.SeachWord : search,
      from: null,
      to: null,
      author: null,
      techstack: null,
      functions: null,
      feature: null,
      sortby: null,
      rating: dataRating,
    });
    techSearchstore.fetchseacrchFilterpost({
      search: search === null ? searchWord.SeachWord : search,
        from: null,
        to: null,
        author: null,
        techstack: null,
        functions: null,
        feature: null,
        sortby: null,
        rating: dataRating,
    })
  };

  const handelTopFilter = (e: any) => {
    // dispatch(
    //   searchFilterPost({
    //     search: search == null ? searchWord.SeachWord : search,
    //     from: null,
    //     to: null,
    //     author: author?.length === 0 ? null : author,
    //     techstack: techStack?.length === 0 ? null : techStack,
    //     functions: functionalUse?.length === 0 ? null : functionalUse,
    //     feature: feature?.length === 0 ? null : feature,
    //     sortby: e.target.value,
    //   })
    // );
    techSearchstore.fetchseacrchFilterpost({
      search: search == null ? searchWord.SeachWord : search,
          from: null,
          to: null,
          author: author?.length === 0 ? null : author,
          techstack: techStack?.length === 0 ? null : techStack,
          functions: functionalUse?.length === 0 ? null : functionalUse,
          feature: feature?.length === 0 ? null : feature,
          sortby: e.target.value,
    })
  };

  const handletechStack = (e: any) => {
    if (e.target.checked) {
      setTechStack([...techStack, parseInt(e?.target?.id)]);
      setFilterArr([...filterArr, e?.target?.name]);
    } else {
      var tempFind = filterArr.filter(
        (value: any) => value !== e?.target?.name
      );
      setFilterArr(tempFind);
      var tempFind1 = techStack.filter(
        (value: any) => value !== parseInt(e?.target?.id)
      );
      setTechStack(tempFind1);
    }
  };
  const handleFunctionalUse = (e: any) => {
    if (e.target.checked) {
      setFunctionalUse([...functionalUse, parseInt(e?.target?.name)]);
      setFilterArr([...filterArr, e?.target?.name]);
    } else {
      var tempFind = filterArr.filter(
        (value: any) => value !== e?.target?.name
      );
      setFilterArr(tempFind);
      var tempFind1 = functionalUse.filter(
        (value: any) => value !== parseInt(e?.target?.name)
      );
      setFunctionalUse(tempFind1);
    }
  };
  const handleFeature = (e: any) => {
    console.log(e,"Data")
    if (e.target.checked) {
      setFeature([...feature, parseInt(e?.target?.id)]);
      setFilterArr([...filterArr, e?.target?.name]);
    } else {
      var tempFind = filterArr.filter(
        (value: any) => value !== e?.target?.name
      );
      setFilterArr(tempFind);
      var tempFind1 = feature.filter(
        (value: any) => value !== parseInt(e?.target?.id)
      );
      setFeature(tempFind1);
    }
  };
  const handleAuthor = (e: any) => {
    if (e.target.checked) {
      setAuthor([...author, parseInt(e?.target?.id)]);
      setFilterArr([...filterArr, e?.target?.name]);
    } else {
      var tempFind = filterArr.filter(
        (value: any) => value !== e?.target?.name
      );
      setFilterArr(tempFind);
      var tempFind1 = author.filter(
        (value: any) => value !== parseInt(e?.target?.id)
      );
      setAuthor(tempFind1);
    }
  };

  const handlePostedWithin = (e: any) => {
    setPostedWithin(true);

    if (e?.target?.name === "A Week") {
      var toDate = new Date();
      var dateOffset = 24 * 60 * 60 * 1000 * 7;
      const currentDate = moment(toDate).utc().format("YYYY-MM-DD");
      const week = moment(toDate?.getTime() - dateOffset)
        .utc()
        .format("YYYY-MM-DD");

      setFrom(week);
      setTo(currentDate);
    }
    if (e?.target?.name === "A Month") {
      var toDate = new Date();
      var dateOffset = 24 * 60 * 60 * 1000 * 30;
      const currentDate = moment(toDate).utc().format("YYYY-MM-DD");
      const week = moment(toDate?.getTime() - dateOffset)
        .utc()
        .format("YYYY-MM-DD");

      setFrom(week);
      setTo(currentDate);
    }
    if (e?.target?.name === "6 Months") {
      var toDate = new Date();
      var dateOffset = 24 * 60 * 60 * 1000 * 180;
      const currentDate = moment(toDate).utc().format("YYYY-MM-DD");
      const week = moment(toDate?.getTime() - dateOffset)
        .utc()
        .format("YYYY-MM-DD");

      setFrom(week);
      setTo(currentDate);
    }
    if (e?.target?.name === "1 Year") {
      var toDate = new Date();
      var dateOffset = 24 * 60 * 60 * 1000 * 365;
      const currentDate = moment(toDate).utc().format("YYYY-MM-DD");
      const week = moment(toDate?.getTime() - dateOffset)
        .utc()
        .format("YYYY-MM-DD");

      setFrom(week);
      setTo(currentDate);
    }

    if (e?.target?.name === "Custom") {
      setCustomFlag(!customFlag);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    // dispatch(
    //   searchFilterPost({
    //     search: search,
    //     from,
    //     to,
    //     author: author?.length === 0 ? null : author,
    //     techstack: techStack?.length === 0 ? null : techStack,
    //     functions: functionalUse?.length === 0 ? null : functionalUse,
    //     feature: feature?.length === 0 ? null : feature,
    //   })
    // );
    techSearchstore.fetchseacrchFilterpost({
      search: search,
          from,
          to,
          author: author?.length === 0 ? null : author,
          techstack: techStack?.length === 0 ? null : techStack,
          functions: functionalUse?.length === 0 ? null : functionalUse,
          feature: feature?.length === 0 ? null : feature,
    })
  };

  const handleClose = (index: any) => {
    const tempTechStack = techSearchstore?.techStacklist?.techstack?.find(
      (a: any, b: any) => a.name === filterArr[index]
    );
    const tempAuthor =  techSearchstore?.techStacklist?.authors?.find(
      (a: any, b: any) => a.name === filterArr[index]
    );
    const tempFunctions =  techSearchstore?.techStacklist?.functions?.find(
      (a: any, b: any) => a.name === filterArr[index]
    );
    const tempFeatures =  techSearchstore?.techStacklist?.features?.find(
      (a: any, b: any) => a.name === filterArr[index]
    );
    if (tempTechStack) {
      setTechStack(techStack.filter((id: any) => id !== tempTechStack?.id));
    }
    if (tempAuthor) {
      setAuthor(author.filter((id: any) => id !== tempAuthor?.id));
    }
    if (tempFunctions) {
      setFunctionalUse(
        functionalUse.filter((id: any) => id !== tempFunctions?.id)
      );
    }
    if (tempFeatures) {
      setFeature(feature.filter((id: any) => id !== tempFeatures?.id));
    }

    setFilterArr(filterArr.filter((ele: any, i: any) => i !== index));
  };
  const handleClearAll = (e: any) => {
    e.preventDefault();
    setTechStack([]);
    setFeature([]);
    setFunctionalUse([]);
    setAuthor([]);
    setFilterArr([]);
    setRating([]);
    var elm5: any = document.getElementById("customControl5");
    var elm4: any = document.getElementById("customControl4");
    var elm3: any = document.getElementById("customControl3");
    var elm2: any = document.getElementById("customControl2");
    var elm1: any = document.getElementById("customControl1");
    elm5.checked = false;
    elm4.checked = false;
    elm3.checked = false;
    elm2.checked = false;
    elm1.checked = false;
  };

  const handleFavorite = async (id: any, isFav: any) => {
    setFavIcon(!favIcon);
    const flagFav = isFav === 1 ? false : true;
    const favResponse: any = await dispatch(addRemoveFevorites(id, flagFav));
    if (favResponse?.status) {
      toast.success(
        isFav === 1
          ? "Data Removed from My Favourties"
          : "Data Added to My Favourites"
      );
      // dispatch(
      //   searchFilterPost({
      //     search: search === null ? searchWord.SeachWord : search,
      //     from,
      //     to,
      //     author: author?.length === 0 ? null : author,
      //     techstack: techStack?.length === 0 ? null : techStack,
      //     functions: functionalUse?.length === 0 ? null : functionalUse,
      //     feature: feature?.length === 0 ? null : feature,
      //   })
      // );
      techSearchstore.fetchseacrchFilterpost({
        search: search === null ? searchWord.SeachWord : search,
            from,
            to,
            author: author?.length === 0 ? null : author,
            techstack: techStack?.length === 0 ? null : techStack,
            functions: functionalUse?.length === 0 ? null : functionalUse,
            feature: feature?.length === 0 ? null : feature,
      })
    }
  };

  useEffect(() => {
    dispatch(
      searchFilterPost({
        search: search == null ? searchWord.SeachWord : search,
        from: from,
        to: to,
        author: author?.length === 0 ? null : author,
        techstack: techStack?.length == 0 ? null : techStack,
        functions: functionalUse?.length === 0 ? null : functionalUse,
        feature: feature?.length == 0 ? null : feature,
        //rating: ratings?.length == 0 ? null : ratings
      })
    );
    techSearchstore.fetchseacrchFilterpost({
        search: search == null ? searchWord.SeachWord : search,
        from: from,
        to: to,
        author: author?.length === 0 ? null : author,
        techstack: techStack?.length == 0 ? null : techStack,
        functions: functionalUse?.length === 0 ? null : functionalUse,
        feature: feature?.length == 0 ? null : feature,
        //rating: ratings?.length == 0 ? null : ratings
    })
  }, [techStack, functionalUse, feature, author, to, from, search]);

  useEffect(() => {
    document.body.className = "app nav-light d-flex flex-column h-100";
  }, []);

  return (
    <Fragment>
      <div className="app nav-light d-flex flex-column h-100">
        <header>
          <Component_Header />
          <div className="nav-scroller bg-blue shadow-sm">
            <nav className="nav nav-underline">
              <Link className="nav-link" to="/reusableComponent">
                Summary
              </Link>
              <Link className="nav-link active" to="">
                Search
              </Link>
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
              <Link className="nav-link" to="/Manage_Components">
                Manage Components
              </Link>
              {roleName() === Permissions.Admin ? (
                <Link className="nav-link" to="/report">
                  Reports
                </Link>
              ) : (
                ""
              )}
              <Link className="nav-link" to="/Issue_Tracker">
                Issue Tracker
              </Link>
            </nav>
          </div>
          <ToastContainer />
        </header>
        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <div className="filter-sidebar-block">
            <section className="filter_wrapper">
              <div className="filter-block">
                <h5>Filter by</h5>
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here"
                      onChange={(e: any) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleSearch}
                      >
                        <i className="ra ra-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="filter-block filter-border">
                <h5>Tech Stack</h5>
                <div className="filter-scroll">
                  {techSearchstore?.techStacklist?.techstack.map((data: any) => {
                    return (
                      <div className="custom-control custom-checkbox mr-sm-2 ">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          onChange={handletechStack}
                          id={data?.id}
                          name={data?.name}
                          checked={filterArr.find(
                            (value: any) => value === data.name
                          )}
                        />
                        <label
                          className="custom-control-label custom-control-label-valign"
                          htmlFor="customControl"
                        >
                          {data?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="filter-block filter-border">
                <h5>Functional Use</h5>
                <div className="filter-scroll">
                  {techSearchstore?.techStacklist?.functions?.map((data: any) => {
                    return (
                      <div className="custom-control custom-checkbox mr-sm-2 ">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          onChange={handleFunctionalUse}
                          id={data?.id}
                          name={data?.name}
                          checked={filterArr.find(
                            (value: any) => value === data.name
                          )}
                        />
                        <label
                          className="custom-control-label custom-control-label-valign"
                          htmlFor="customControl"
                        >
                          {data?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="filter-block filter-border">
                <h5>Feature</h5>
                <div className="filter-scroll">
                  {techSearchstore?.techStacklist?.features?.map((data: any) => {
                    return (
                      <div className="custom-control custom-checkbox mr-sm-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          onChange={handleFeature}
                          id={data?.id}
                          name={data?.name}
                          checked={filterArr.find(
                            (value: any) => value === data.name
                          )}
                        />
                        <label
                          className="custom-control-label custom-control-label-valign"
                          htmlFor="customControl"
                        >
                          {data?.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="filter-block filter-border">
                <h5>Author</h5>
                <div className="filter-scroll">
                  {techSearchstore?.techStacklist?.authors?.map(
                    (data: any, index: any) => {
                      return (
                        <div className="custom-control custom-checkbox mr-sm-2 ">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            onChange={handleAuthor}
                            id={data?.id}
                            name={data?.name}
                            checked={filterArr.find(
                              (value: any) => value === data.name
                            )}
                          />
                          <label
                            className="custom-control-label custom-control-label-valign"
                            htmlFor="customControl"
                          >
                            {data?.name}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="filter-block filter-border">
                <h5>Ratings</h5>
                <div className="filter-scroll">
                  <div className="custom-control custom-checkbox mr-sm-2 ">
                    <input
                      onChange={handleRating}
                      type="checkbox"
                      value="5"
                      className="custom-control-input"
                      id="customControl5"
                    />
                    <label
                      className="custom-control-label custom-control-label-valign"
                      htmlFor="customControl5"
                    >
                      <img src={star5} alt="star" />
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox mr-sm-2 ">
                    <input
                      onChange={handleRating}
                      type="checkbox"
                      value="4"
                      className="custom-control-input"
                      id="customControl4"
                    />
                    <label
                      className="custom-control-label custom-control-label-valign"
                      htmlFor="customControl4"
                    >
                      <img src={star4} alt="star" />
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox mr-sm-2 ">
                    <input
                      onChange={handleRating}
                      type="checkbox"
                      value="3"
                      className="custom-control-input"
                      id="customControl3"
                    />
                    <label
                      className="custom-control-label custom-control-label-valign"
                      htmlFor="customControl3"
                    >
                      <img src={star3} alt="star" />
                    </label>
                  </div>

                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      value="2"
                      onChange={handleRating}
                      className="custom-control-input"
                      id="customControl2"
                    />
                    <label
                      className="custom-control-label custom-control-label-valign"
                      htmlFor="customControl2"
                    >
                      <img src={star2} alt="star" />
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      value="1"
                      onChange={handleRating}
                      className="custom-control-input"
                      id="customControl1"
                    />
                    <label
                      className="custom-control-label custom-control-label-valign"
                      htmlFor="customControl1"
                    >
                      <img src={star1} alt="star" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter-block">
                <h5>Posted Within</h5>
                {postedWithinArr?.map((data: string, index: any) => {
                  return (
                    <div className="custom-control custom-checkbox mr-sm-2 ">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        onChange={handlePostedWithin}
                        name={data}
                        id={index}
                        checked={filterArr.find((value: any) => value === data)}
                      />
                      <label
                        className="custom-control-label custom-control-label-valign"
                        htmlFor="customControl"
                      >
                        {data}
                      </label>
                    </div>
                  );
                })}
                {customFlag ? (
                  <div className="form-group row">
                    <div className="col">
                      <label className="control-label">From</label>
                      <div className="input-group custom-datepicker">
                        <input
                          type="date"
                          className="form-control demoDate "
                          placeholder="Select Date"
                          aria-label="Select Datee "
                          onChange={(e: any) =>
                            setFrom(
                              moment(e?.target?.value)
                                .utc()
                                .format("YYYY-MM-DD")
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="control-label">To</label>
                      <div className="input-group custom-datepicker">
                        <input
                          type="date"
                          className="form-control demoDate "
                          placeholder="Select Date"
                          aria-label="Select Datee"
                          onChange={(e: any) =>
                            setTo(
                              moment(e?.target?.value)
                                .utc()
                                .format("YYYY-MM-DD")
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
            <section className="section_wrapper">
              <form onSubmit={handleSearch}>
                <div className="search_header">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by tech stack, component name or functional use"
                      onChange={(e: any) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleSearch}
                      >
                        <i className="ra ra-search"></i>
                      </button>
                    </div>
                  </div>

                  <div className="fitler-mobile-btn">
                    <a
                      href="#"
                      className="btn btn-primary btn-i "
                      id=""
                      data-toggle="modal"
                      data-target="#myModal2"
                    >
                      {" "}
                      <i className="ra ra-filter"></i>
                    </a>
                  </div>
                </div>
              </form>
              <div className="filter_result_wrapper">
                <div className="filter_result_lt">
                  <div className="filter_result_list">
                    <ul>
                      {filterArr?.map((value: any, index: any) => {
                        return (
                          <li>
                            <span className="badge badge-light" key={index}>
                              {value}{" "}
                              <Link onClick={() => handleClose(index)} to="">
                                <i className="ra ra-close"></i>
                              </Link>{" "}
                            </span>
                          </li>
                        );
                      })}
                      <li>
                        {filterArr.length == 0 ? (
                          ""
                        ) : (
                          <Link to="" onClick={handleClearAll} className="link">
                            Clear all
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="filter_result_rt">
                  <div className="form-inline">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Sort by:
                      </label>
                      <select
                        className="form-control"
                        onChange={handelTopFilter}
                      >
                        <option value=" ">Please Select </option>
                        <option value="viewed">Most Viewed </option>
                        <option value="rating">Most Rating </option>
                      </select>
                    </div>
                  </div>
                  <div className="btn-group-link ml-2">
                    <button
                      onClick={() => setViewType(true)}
                      className="btn btn-link active"
                    >
                      {" "}
                      <i className="ra ra-list_act mr-0"></i>{" "}
                    </button>
                    <button
                      onClick={() => setViewType(false)}
                      className="btn btn-link active"
                    >
                      {" "}
                      <i className="ra ra-grid mr-0"></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 search_list_wrapper">
                <div className="page-title">
                  <h4>
                    {techSearchstore?.searchFilterPost?.payload?.length} Result for{" "}
                    {searchWord.SeachWord}
                  </h4>
                </div>

                {viewType === true ? (
                  <div className="grid_wrapper grid-1">
                    {SearchData?.map((item: any, index: any) => {
                      return (
                        <div className="card  card-boxshadow" key={index}>
                          <div className="card_head mb-2">
                            <div className="card_icon">
                              <img src={item?.image_url} alt="Technology" />
                            </div>
                            <div className="cardhead_info">
                              <div className="cardhead_info_lt">
                                <h4 className="card_title">
                                  <Link to={`/View_Component/${item?.id}`}>
                                    {item.name}
                                  </Link>
                                </h4>
                                <div className="cardsub_title">
                                  <img
                                    src={item?.techstack_image_url}
                                    alt="tech logo"
                                    className="mr-2"
                                  />{" "}
                                  {item?.techstack} | {item?.categoryName}
                                </div>
                              </div>
                              <div className="cardhead_info_rt">
                                <div className="star_rating mr-4">
                                  <img
                                    src={
                                      item?.rating === 3
                                        ? star3
                                        : "" || item?.rating === 2
                                        ? star2
                                        : "" || item?.rating === 1
                                        ? star1
                                        : "" || item?.rating === 4
                                        ? star4
                                        : "" || item?.rating === 5
                                        ? star5
                                        : "" || item?.rating === null
                                        ? noStar
                                        : "" || item?.rating === undefined
                                        ? noStar
                                        : ""
                                    }
                                    alt="rating"
                                    className="mr-2"
                                  />
                                </div>
                                <Link
                                  to=""
                                  className={`btn-favorite  ${
                                    item?.isFavorite == 1 ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    handleFavorite(item?.id, item?.isFavorite)
                                  }
                                >
                                  <i className="ra ra-heart"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="card_body card_pl">
                            <p className="text-ellipsis--2 mb-2">
                              {item?.description}
                            </p>
                          </div>
                          <div className="card_footer card_ml">
                            <div className="card_footer_lt">
                              <ul className="taglist">
                                {item?.tags?.map((tag: any) => {
                                  return (
                                    <li>
                                      <span>{tag.name}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="card_footer_rt">
                              <div className="card_label mr-3">
                                <i className="ra ra-eye_open"></i> {item.views}
                              </div>
                              <div className="card_label mr-3">
                                <i className="ra ra-download"></i>{" "}
                                {item.downloads}
                              </div>
                              <div className="card_label_auth">
                                {item?.author_name} on{" "}
                                {moment(item?.createdAt)
                                  .utc()
                                  .format("MMM DD,YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid_wrapper grid-3">
                    {SearchData?.map((item: any, index: any) => {
                      return (
                        <div className="card  card-boxshadow">
                          <div className="card_head mb-2">
                            <div className="card_icon">
                              <img src={item?.image_url} alt="Technology" />
                            </div>
                            <div className="cardhead_info">
                              <div className="cardhead_info_lt">
                                <h4 className="card_title">
                                  <Link to={`/View_Component/${item?.id}`}>
                                    {item.name}
                                  </Link>
                                </h4>
                                <div className="cardsub_title">
                                  <img
                                    src={item?.techstack_image_url}
                                    alt="tech logo"
                                    className="mr-2"
                                  />{" "}
                                  {item?.techstack} | {item?.categoryName}
                                </div>
                              </div>
                              <div className="cardhead_info_rt">
                                <Link
                                  to=""
                                  className={`btn-favorite  ${
                                    item?.isFavorite == 1 ? "active" : ""
                                  }`}
                                  onClick={() =>
                                    handleFavorite(item?.id, item?.isFavorite)
                                  }
                                >
                                  <i className="ra ra-heart"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="card_body">
                            <p className="text-ellipsis--2 mb-2">
                              {item?.description}
                            </p>
                          </div>
                          <div className="card_subfooter">
                            <div className="card_footer_lt">
                              <div className="star_rating ">
                                <img
                                  src={
                                    item?.rating === 3
                                      ? star3
                                      : "" || item?.rating === 2
                                      ? star2
                                      : "" || item?.rating === 1
                                      ? star1
                                      : "" || item?.rating === 4
                                      ? star4
                                      : "" || item?.rating === 5
                                      ? star5
                                      : "" || item?.rating === null
                                      ? noStar
                                      : "" || item?.rating === undefined
                                      ? noStar
                                      : ""
                                  }
                                  alt="rating"
                                  className="mr-2"
                                />
                              </div>
                            </div>
                            <div className="card_footer_rt">
                              <div className="card_label mr-3">
                                <i className="ra ra-eye_open"></i> {item.views}
                              </div>
                              <div className="card_label mr-3">
                                <i className="ra ra-download"></i>{" "}
                                {item.downloads}
                              </div>
                            </div>
                          </div>
                          <div className="card_footer ">
                            <div className="card_footer_lt">
                              <ul className="taglist">
                                {item?.tags?.map((tag: any) => {
                                  return (
                                    <li>
                                      <span>{tag.name}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="card_footer_rt">
                              <div className="card_label_auth">
                                {item?.author_name} on{" "}
                                {moment(item?.createdAt)
                                  .utc()
                                  .format("MMM DD,YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {userSearchfilterData?.payload?.length > datanumber &&
                noOfComponent <= userSearchfilterData?.payload?.length ? (
                  <div className="d-flex align-items-center justify-content-center py-4">
                    <Link
                      to=""
                      onClick={loadMore}
                      className="btn btn-outline-primary"
                    >
                      Load More
                    </Link>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </main>
        {/* <!-- Footer --> */}
        <Component_Footer />
      </div>
    </Fragment>
  );
}

export default Search_List;

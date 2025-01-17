import React, { Fragment, useEffect, useMemo, useState } from "react";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  adminManageComponentsGetViewRequest,
  adminManageCompsaveDataPost,
  componentStatus,
  adminTagListGet,
} from "../../redux/action/adminAction";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { Autocomplete, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ComponentNavbar from "./componentNavbar";
import { roleName, userPermission } from "./auth/authUser";
import { AllTags, AdminTagList } from "./InterfaceTypes";
import { Permissions } from "../../constants/PermissionConstant";
function Edit_Manage_Components() {
  const dispatch = useDispatch<AppDispatch>();
  let compId = useParams();
  const navigate = useNavigate();

  const { adminManageComponentsGetview } = useSelector(
    (state: any) => state?.adminManageComponentsGetview
  );

  const { adminTagList } = useSelector((state: any) => state?.adminTagList);

  const [formData, setFormData] = useState<any>({});
  const [compData, setCompData] = useState<any>([]);
  const [compImg, setCompImg] = useState(
    adminManageComponentsGetview?.payload?.image_url
  );
  const [techImg, setTechImg] = useState(
    adminManageComponentsGetview?.payload?.techstack?.avatar_url
  );

  // permission updateMetaDetail
  let allowUpdatePermission = userPermission().filter(
    (id: any) => id === Permissions.UpdateComponentMetadetails
  );

  // permission PublishComponent
  let allowPublishPermission = userPermission().filter(
    (id: any) => id === Permissions.PublishComponent
  );

  const imageHandler1 = (e: any) => {
    const reader = new FileReader();
    setFormData({
      ...formData,
      componentImg: e.target.files[0],
    });
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCompImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };


  
  const imageHandler2 = (e: any) => {
    const reader = new FileReader();
    setFormData({
      ...formData,
      techstackImg: e.target.files[0],
    });
    reader.onload = () => {
      if (reader.readyState === 2) {
        setTechImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCompStatus = async (flag: boolean) => {
    let Obj = {} as Object;
    Obj = {
      id: adminManageComponentsGetview?.payload?.id,
      publishFlag: flag,
    };
    const componentStatusCode: any = await dispatch(
      componentStatus(Obj, formData)
    );

    if (componentStatusCode?.status === 200) {
      toast.success(flag === true ? "Data Published" : "Data Unpublished");
    }
    setTimeout(() => {
      navigate("/Manage_components");
    }, 1000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postStatusCode: any = await dispatch(
      adminManageCompsaveDataPost(
        adminManageComponentsGetview?.payload?.id,
        formData
      )
    );
    if (postStatusCode?.status === 200) {
      toast.success("Data Updated Successfully");
    }
    setTimeout(() => {
      navigate("/Manage_components");
    }, 1000);
  };

  useEffect(() => {
    setCompImg(adminManageComponentsGetview?.payload?.image_url);
    setTechImg(adminManageComponentsGetview?.payload?.techstack?.avatar_url);
    setFormData({
      ...formData,
      componentImg: null,
      techstackImg: null,
      display_name: adminManageComponentsGetview?.payload?.display_name,
      features: adminManageComponentsGetview?.payload?.features,
      functions: adminManageComponentsGetview?.payload?.functional_use,
      tags: adminManageComponentsGetview?.payload?.component_tags?.map(
        (tag: AllTags) => tag.name
      ),
      functional_tags:
        adminManageComponentsGetview?.payload?.functional_tags?.map(
          (tag: AllTags) => tag.name
        ),
      feature_tags: adminManageComponentsGetview?.payload?.feature_tags?.map(
        (tag: AllTags) => tag.name
      ),
    });
  }, [adminManageComponentsGetview?.payload?.id]);

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100  nav-light";

    DataFun();
  }, []);

  const DataFun = async () => {
    var comp: any = await dispatch(
      adminManageComponentsGetViewRequest(compId?.id)
    );
    setCompData(comp);
    var tagList = await dispatch(adminTagListGet());
  };

  return (
    <Fragment>
      <div className="app bg-light">
        <header>
          <ComponentHeader />
          <ComponentNavbar />
        </header>

        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <form onSubmit={handleSubmit}>
              <div className="container container-fluid">
                <div className="tile_wrapper">
                  <div className="tilewp_header">
                    <div className="tilewp-left">
                      <h3 className="tilewp-title">Edit Manage Components</h3>
                    </div>
                    <div className="tilewp-right">
                      <div className="btn-groups">
                        <Link
                          className="btn apply btn-outline-primary mr-2"
                          to="/Manage_Components"
                        >
                          Cancel
                        </Link>

                        {allowPublishPermission.length !== 0 ? (
                          adminManageComponentsGetview?.payload?.status ==
                          "publish" ? (
                            <Link
                              to=""
                              onClick={() => handleCompStatus(false)}
                              className="btn apply btn-outline-primary mr-2"
                            >
                              Unpublish
                            </Link>
                          ) : adminManageComponentsGetview?.payload?.status ==
                            "draft" ? (
                            <Link
                              to=""
                              onClick={() => handleCompStatus(true)}
                              className="btn apply btn-outline-primary mr-2"
                            >
                              Publish
                            </Link>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}

                        {allowUpdatePermission.length !== 0 ? (
                          <button className="btn reset btn-primary">
                            Save
                          </button>
                        ) : (
                          ""
                        )}

                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                  <div className="tilewp-body">
                    <div className="editcomponent-wrapper">
                      <div className="editcompont-lt">
                        <div className="editcompont-header">
                          <div className="editcompont-header-lt">
                            <div className="form-group">
                              <label className="control-label">ID</label>
                              <div className="control-text">
                                {adminManageComponentsGetview?.payload?.id}
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="control-label">Title</label>
                              <div className="control-text">
                                {adminManageComponentsGetview?.payload?.title}
                              </div>
                            </div>
                          </div>
                          <div className="editcompont-header-rt">
                            <div className="d-flex justify-content-end align-items-end">
                              <label
                                htmlFor="images"
                                className="drop-container"
                              >
                                <span className="drop-title">
                                  <img src={compImg} className="image" />
                                </span>
                                <input
                                  type="file"
                                  className="file-control imageFile"
                                  id="images1"
                                  accept="image/*"
                                  name="componentImage"
                                  onChange={imageHandler1}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="editcompont-form">
                          <div className="form-group">
                            <label className="control-label">
                              Display Name<span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  display_name: e.target.value,
                                })
                              }
                              defaultValue={compData?.payload?.display_name}
                            />
                          </div>
                          <div className="form-group">
                            <label className="control-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={8}
                              placeholder="Enter Here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              defaultValue={compData?.payload?.description}
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Feature Tags
                            </label>
                            {adminTagList && compData && (
                              <Autocomplete
                                multiple
                                id="tags-filled"
                                options={adminTagList?.payload?.feature_tags?.map(
                                  (item: AdminTagList) => {
                                    return item.name;
                                  }
                                )}
                                onChange={(event, value: any) =>
                                  setFormData({
                                    ...formData,
                                    feature_tags: value,
                                  })
                                }
                                defaultValue={compData?.payload?.feature_tags?.map(
                                  (item: AllTags) => {
                                    return item.name;
                                  }
                                )}
                                freeSolo
                                renderTags={(
                                  value: readonly string[],
                                  getTagProps: any
                                ) =>
                                  value.map((option: string, index: number) => (
                                    <Chip
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                    />
                                  ))
                                }
                                renderInput={(params: any) => (
                                  <TextField
                                    {...params}
                                    variant="filled"
                                    label="Select Tags"
                                    placeholder="Tags"
                                  />
                                )}
                              />
                            )}
                          </div>
                          <div className="form-group">
                            <label className="control-label">Feature</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Enter Here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  features: e.target.value,
                                })
                              }
                              defaultValue={compData?.payload?.features}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="editcompont-rt">
                        <div className="editcompontRT-form">
                          <div className="editcompont-header">
                            <div className="editcompont-header-lt">
                              <div className="form-group">
                                <label className="control-label">
                                  Tech Stack
                                </label>
                                <div className="control-text">
                                  {compData?.payload?.techstack?.name}
                                </div>
                              </div>
                            </div>
                            <div className="editcompont-header-rt">
                              <div className="d-flex justify-content-end align-items-end">
                                <label
                                  htmlFor="images"
                                  className="drop-container"
                                >
                                  <span className="drop-title">
                                    {/* <i className="las la-camera"></i> */}
                                    <img src={techImg} className="image" />
                                  </span>
                                  {roleName() === Permissions.Admin ? (
                                    <input
                                      type="file"
                                      className="file-control imageFile"
                                      id="images2"
                                      name="techstackImage"
                                      accept="image/*"
                                      onChange={imageHandler2}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="editcompont-form">
                            <div className="form-group">
                              <label className="control-label">
                                Git Lab Link
                                <span className="text-danger">*</span>
                              </label>
                              <div className="control-text">
                                {
                                  adminManageComponentsGetview?.payload
                                    ?.gitlab_url
                                }
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Component Tags
                              </label>
                              {adminTagList && compData && (
                                <Autocomplete
                                  multiple
                                  id="tags-filled"
                                  options={adminTagList?.payload?.tags?.map(
                                    (item: AdminTagList) => {
                                      return item.name;
                                    }
                                  )}
                                  onChange={(event, value: any) =>
                                    setFormData({
                                      ...formData,
                                      tags: value,
                                    })
                                  }
                                  defaultValue={compData?.payload?.component_tags?.map(
                                    (item: AllTags) => {
                                      return item.name;
                                    }
                                  )}
                                  freeSolo
                                  renderTags={(
                                    value: readonly string[],
                                    getTagProps: any
                                  ) =>
                                    value.map(
                                      (option: string, index: number) => (
                                        <Chip
                                          variant="outlined"
                                          label={option}
                                          {...getTagProps({ index })}
                                        />
                                      )
                                    )
                                  }
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      label="Select Tags"
                                      placeholder="Tags"
                                    />
                                  )}
                                />
                              )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Functional Tags
                              </label>
                              {adminTagList && compData && (
                                <Autocomplete
                                  multiple
                                  id="tags-filled"
                                  options={adminTagList?.payload?.functionalTags?.map(
                                    (item: AdminTagList) => {
                                      return item.name;
                                    }
                                  )}
                                  onChange={(event, value: any) =>
                                    setFormData({
                                      ...formData,
                                      functional_tags: value,
                                    })
                                  }
                                  defaultValue={compData?.payload?.functional_tags?.map(
                                    (item: AllTags) => {
                                      return item.name;
                                    }
                                  )}
                                  freeSolo
                                  renderTags={(
                                    value: readonly string[],
                                    getTagProps: any
                                  ) =>
                                    value.map(
                                      (option: string, index: number) => (
                                        <Chip
                                          variant="outlined"
                                          label={option}
                                          {...getTagProps({ index })}
                                        />
                                      )
                                    )
                                  }
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      label="Select Tags"
                                      placeholder="Tags"
                                    />
                                  )}
                                />
                              )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Frameworks
                              </label>

                              {adminTagList && compData && (
                                <Autocomplete
                                  multiple
                                  id="tags-filled"
                                  options={adminTagList?.payload?.frameworks?.map(
                                    (item: AdminTagList) => {
                                      return item?.name;
                                    }
                                  )}
                                  onChange={(event, value: any) =>
                                    setFormData({
                                      ...formData,
                                      frameworks: value,
                                    })
                                  }
                                  defaultValue={compData?.payload?.framework_tags?.map(
                                    (item: AllTags) => {
                                      return item?.name;
                                    }
                                  )}
                                  freeSolo
                                  renderTags={(
                                    value: readonly string[],
                                    getTagProps: any
                                  ) =>
                                    value.map(
                                      (option: string, index: number) => (
                                        <Chip
                                          variant="outlined"
                                          label={option}
                                          {...getTagProps({ index })}
                                        />
                                      )
                                    )
                                  }
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      label="Select Tags"
                                      placeholder="Tags"
                                    />
                                  )}
                                />
                              )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Functional Use
                              </label>
                              <textarea
                                className="form-control"
                                rows={4}
                                placeholder="Enter Here"
                                onChange={(e: any) =>
                                  setFormData({
                                    ...formData,
                                    functions: e.target.value,
                                  })
                                }
                                defaultValue={compData?.payload?.functional_use}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="editcompontRT-info">
                          <div className="form-group">
                            <label className="control-label">Version</label>
                            <div className="control-text">
                              {adminManageComponentsGetview?.payload?.version}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">Created On</label>
                            <div className="control-text">
                              {moment(
                                adminManageComponentsGetview?.payload?.createdAt
                              )
                                .utc()
                                .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Updated by
                            </label>
                            <div className="control-text">
                              {
                                adminManageComponentsGetview?.payload
                                  ?.updated_by
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Updated On
                            </label>
                            <div className="control-text">
                              {adminManageComponentsGetview?.payload
                                ?.updatedAt === null
                                ? "---"
                                : moment(
                                    adminManageComponentsGetview?.payload
                                      ?.updatedAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Draft On
                            </label>
                            <div className="control-text">
                              {adminManageComponentsGetview?.payload
                                ?.draftAt === null
                                ? "---"
                                : moment(
                                    adminManageComponentsGetview?.payload
                                      ?.draftAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Published On
                            </label>
                            <div className="control-text">
                              {adminManageComponentsGetview?.payload
                                ?.publishedAt === null
                                ? "---"
                                : moment(
                                    adminManageComponentsGetview?.payload
                                      ?.publishedAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tilewp-footer "></div>
                </div>
              </div>
            </form>
          </section>
        </main>

        <ComponentFooter />
      </div>
    </Fragment>
  );
}

export default Edit_Manage_Components;

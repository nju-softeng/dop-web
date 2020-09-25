// 配置所有接口的API文件


// const host = "http://open.dop.clsaa.com";
const host = "http://localhost:8888";

const pipeline = "/pipeline-server";
const application = "/application-server";
const permission = "/permission-server";
const code = "/code-server";
const user = "/user-server";
const image = "/image-server";
const test = "/test-server";
const alert = "/alert-server";

const scan = "/testing-server";
const baas = "/baas-server";
// const gateway = "/v2/api";
const gateway = "/gateway-server";
const link = "/link-server";


const API = {
    address: "http://www.dop.clsaa.com/#/",
    gateway: host,
    pipeline: host + pipeline,
    application: host + application,
    permission: host + permission,
    code: host + code,
    user: host + user,
    image: host + image,
    test: host + test,
    alert: host + alert,
    scan: host + scan,
    link: host + link,
    fuzz: "http://localhost:8080/fuzz",
    //demo: "http://118.24.13.51:8080/fuzz",
    baas:  "localhost:14800",

};

export default API;

const host = "http://open.devopsplus.com.cn:30393";

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
const link = "/link-server";

const API = {
    address: "http://www.dop.devops-plus.com:30393/#/",
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
    demo: "http://localhost:8080/fuzz",
    baas:  "localhost:14800",

};

export default API;

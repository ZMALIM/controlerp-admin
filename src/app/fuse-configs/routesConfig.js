import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
// import {authRoleExamplesConfigs} from 'app/main/auth/authRoleExamplesConfigs';
import {LoginConfig} from 'app/main/login/LoginConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];

 export default routes;

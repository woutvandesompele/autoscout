import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginRedirect = (props) => {
  const [text, setText] = useState('Logging in... This can take a few seconds...');
  const location = useLocation();
  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/api/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        
        localStorage.setItem('userId', res.user.id);

        // TODO: check of er al een profile met die user:id is? (fetch van profile...)
        // fetch profile en check dat
        
        // indien niet: maak een profile aan met dat user id

        // in strapi maak je profile aan met een username en userid

        // en een linked relation voor je favourites
        
        
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        setTimeout(() => history('/discover'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [history, location.search, params.providerName]);

  return <p>{text}</p>
};

export default LoginRedirect;






// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { useQuery } from 'react-query';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// const LoginRedirect = (props) => {
//   const [text, setText] = useState('Loading...');
//   const location = useLocation();
//   const params = useParams();
//   const history = useNavigate();

//   useEffect(() => {
//     // Successfully logged with the provider
//     // Now logging with strapi by using the access_token (given by the provider) in props.location.search
//     fetch(`${backendUrl}/api/auth/${params.providerName}/callback${location.search}`)
//       .then(res => {
//         if (res.status !== 200) {
//           throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
//         }
//         return res;
//       })
//       .then(res => res.json())
//       .then(res => {
//         // Successfully logged with Strapi
//         // Now saving the jwt to use it for future authenticated requests to Strapi
//         localStorage.setItem('jwt', res.jwt);
//         localStorage.setItem('username', res.user.username);
//         localStorage.setItem('userId', res.user.id);

//         const { isLoading, error, data: profiles } = useQuery(["cars"] , async () => {
//           const data = await fetch(`${backendUrl}/api/profiles?populate=*`).then(r => r.json());
//           return data;
//         });

//         if (profiles) {
//                   const allProfiles = profiles.data.map(profile => profile.attributes.userId);

//             if (allProfiles.find(e => e === res.user.id)) {
//               const profileId = profiles.data.find(profile => profile.attributes.userId === res.user.id).id
//               localStorage.setItem('profileId', profileId);
//               setText('Welcome back!');
//               // setTimeout(() => navigate('/home'), 1200);
//             }

//             else {
//               fetch(`${backendUrl}/api/profiles`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ data: { userName: res.user.username, userId: res.user.id } }),
//               })
//                 .then(response => response.json())
//                 .then(data => {
//                   console.log('Success:', data);
//                   localStorage.setItem('profileId', data.data.id);
//                   setText('Welcome to Basic Fit!');
//                   setTimeout(() => navigate('/home'), 1200);
//                 })
//                 .catch((error) => {
//                   console.error('Error:', error);
//                 });
//             }
//           }
//         })

//         // TODO: check of er al een profile met die user:id is? (fetch van profile...)
//         // fetch profile en check dat
//         // indien niet: maak een profile aan met dat user id
//         // in strapi maak je profile aan met een username en userid
//         // en een linked relation voor je favourites
//       })
//       .catch(err => {
//         console.log(err);
//         setText('An error occurred, please see the developer console.')
//       });
//   }, [history, location.search, params.providerName];

//   return <p>{text}</p>
// };

// export default LoginRedirect;

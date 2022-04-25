import { useQuery } from 'react-query';

const FavSearch = () => {

  const { isLoading, error, data } = useQuery("brands", async () => {
    const where = encodeURIComponent(JSON.stringify({
          "Year": {
            "$gt": 2021
          }
    }));
    const data = await fetch(
          `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?keys=Make&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id': 'qPjPSDpUMVQonypUKZINQyZc5UKSJVMarbokxtUS', // This is your app's application id
              'X-Parse-REST-API-Key': 'iV8tWZzLHBFNzYQtlMmdnPyaOYCDCCXFtI6soCCO', // This is your app's REST API key
            }
          }
        ).then(r => r.json());
        console.log(JSON.stringify(data, null, 2));
    return data;
  });


  return (
    <div>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Data could not be loaded, please check your internet connection and try again</p>}
      {data && (
        <ul>{data.map(post => <li key={"p" + post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>)}</ul>
      )} */}
    </div>
    );
}

export default FavSearch;
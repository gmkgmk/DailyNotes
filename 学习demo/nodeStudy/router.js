 let route = (handle,pathname,res,postData) => {
   if (typeof handle[pathname] === 'function') {
   return  handle[pathname](res,postData);
   } else {
     return "404 Not found";
   }
 }
 exports.route = route;
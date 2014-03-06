using CustomerFeedback.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace CustomerFeedback.Controllers
{
    public class LogoutController : ApiController
    {
        [AuthUser]
        public string Post()
        {
            try
            {
                FormsAuthentication.SignOut();
                HttpCookie cookie = HttpContext.Current.Request.Cookies.Get("UserConfig");
                HttpContext.Current.Response.Cookies.Remove("UserConfig");
                if (HttpContext.Current.Request.Cookies["UserConfig"] != null)
                {
                    HttpCookie myCookie = new HttpCookie("UserConfig");
                    myCookie.Expires = DateTime.Now.AddDays(-1);
                    HttpContext.Current.Response.Cookies.Add(myCookie);
                }

                return "1";
            }
            catch (Exception e)
            {
                return "0";
            }
        }

    }
}

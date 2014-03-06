using CustomerFeedback.Models;
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
    public class CheckLogginStatusController : ApiController
    {
        [AllowAnonymous]
        public string Post()
        {
            try
            {
                using (var db = new CustomerFeedbackDbContext())
                {

                    var query = from b in db.AdminUser
                                select b;

                    foreach (var AdminUser in query)
                    {
                        if (hasCookieSet(AdminUser.userName))
                        {

                            return "1";
                        }
                    }

                }
                return "0";

            }
            catch (Exception e)
            {
                return "0";
            }

        }

        private bool hasCookieSet(string name)
        {
            try
            {
                HttpCookie cookieAdmin = HttpContext.Current.Request.Cookies.Get("UserConfig");

                if (cookieAdmin != null)
                {
                    FormsAuthenticationTicket authTicketAdmin = FormsAuthentication.Decrypt(cookieAdmin.Value);
                    if (authTicketAdmin.Name == "UserConfig" && authTicketAdmin.UserData == name)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception c)
            {
                return false;
            }
        }


    }
}

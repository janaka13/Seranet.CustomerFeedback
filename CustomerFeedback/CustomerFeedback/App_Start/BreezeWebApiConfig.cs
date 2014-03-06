using System.Web.Http;

[assembly: WebActivator.PreApplicationStartMethod(

   typeof(CustomerFeedback.App_Start.BreezeWebApiConfig), "RegisterBreezePreStart")]

namespace CustomerFeedback.App_Start
{
    // http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
    //</remarks>
    public static class BreezeWebApiConfig
    {

        public static void RegisterBreezePreStart()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "BreezeApi",
                routeTemplate: "breeze/{controller}/{action}"
            );
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;


namespace CustomerFeedback.RequestForm
{
    public class SendMail
    {
        public void send(string address, string subject, string message)
        {
          
           
            try
            {
                System.IO.File.WriteAllText("C:\\out1.txt", "started :" + " User Name :" + System.Environment.GetEnvironmentVariable("CustomerFeedbackUserName") + " Password : " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailPassword") + "  Email: " + System.Environment.GetEnvironmentVariable("CustomerFeedbackMailAddress"));
               
            }
            catch (Exception ex)
            {
                System.IO.File.WriteAllText("C:\\error.txt",ex.Message + ex.StackTrace);
            }
        }
    }
}

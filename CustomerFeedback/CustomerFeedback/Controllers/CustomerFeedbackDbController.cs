﻿using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Breeze.WebApi2;
using CustomerFeedback.Models;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;
using CustomerFeedback.RequestForm;
using System.Net;
using System.IO;
using System.Web.Script.Serialization;
using Login.PasswordHash;
using CustomerFeedback.Filters;

namespace CustomerFeedback.Controllers
{
    [BreezeController]
    [AuthUser]
    public class CustomerFeedbackDbController : ApiController
    {

        protected readonly EFContextProvider<CustomerFeedbackDbContext> _contextProvider =
            new EFContextProvider<CustomerFeedbackDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public void sendMail(string address, string subject, string message)
        {
            (new SendMail()).send(address, subject, message);
        }

        [HttpGet]
        public string getHash(string validationKey)
        {
            string h = PasswordHash.CreateHash(validationKey);
            return PasswordHash.CreateHash(validationKey);
        }

    }
}
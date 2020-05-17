using Microsoft.AspNetCore.Mvc;
using System;

namespace AzureADConnectWebAPI.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return string.Format(@"API (Tech Talk) is running at {0}", DateTime.Now.ToString());
        }
    }
}

using AzureADConnectWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace AzureADConnectWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TechTalkController : Controller
    {
        static ConcurrentBag<TechTalkItem> TechTalkStore = new ConcurrentBag<TechTalkItem>();

        // GET: api/values
        [HttpGet]
        public IEnumerable<TechTalkItem> Get()
        {
            string owner = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            return TechTalkStore.Where(t => t.Owner == owner).ToList();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]TechTalkItem TechTalk)
        {
            string owner = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            TechTalkStore.Add(new TechTalkItem { Owner = owner, Title = TechTalk.Title });
        }
    }
}

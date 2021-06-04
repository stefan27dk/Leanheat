﻿using Leanheat.SearchLogger.Domain.Models;
using Leanheat.Temperature.Search.Application.Interfaces;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leanheat.Temperature.Search.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        // Services
        private readonly ISearchServices _searchServices;
        private readonly IBus _bus;

      
        
        // Constructor
        public SearchController(ISearchServices searchServices, IBus bus)
        {
            _searchServices = searchServices;
            _bus = bus;
        }



        [HttpGet]
        [Route("GetSearchResult")]
        public async Task<IActionResult> GetSearchResult(string searchParam)
        {
            if (searchParam != null)
            {
                var a = new SearchLog();
                a.Search = searchParam;
                Uri uri = new Uri("rabbitmq://192.168.99.100/searchLogQueue");
                var endPoint = await _bus.GetSendEndpoint(uri);
                await endPoint.Send(a);
            }
            return StatusCode(200, await _searchServices.GetSearchResult(searchParam));
        }




        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_searchServices.GetAll());
        }
    }
}

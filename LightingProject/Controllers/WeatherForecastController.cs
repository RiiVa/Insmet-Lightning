using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LightingProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private MbTilesReader _tileReader;
        private LightningService _lightservice;

        public WeatherForecastController(MbTilesReader tileReader , LightningService lightservice)
        {
            _tileReader = tileReader;
            _lightservice = lightservice;

        }

        [HttpGet("{z:int}/{x:int}/{y:int}")]
        public IActionResult Get(int z,int x,int y)
        {
            //var temp = Request.Query;
            //var zoom = temp["zoom"];
            byte[] imageData = _tileReader.GetImageData(x, y, z);
            return File(imageData, "image/png");
        }
        [HttpPost("Light")]
        public async Task<IActionResult> Light([FromForm] DateTime init,[FromForm] DateTime end, [FromForm] int[] peak, [FromForm] int type)
        {
            if (init == null || end == null || peak == null || type == null)
            {
                return Ok();
            }
            
            List<Lightning> list;
            try {
                if (peak[0] == 0 && peak[1] == 0)
                    list = await _lightservice.GetLightning(init, end, type);
                else list = await _lightservice.GetLightning(init, end, peak, type);
                return Ok(list);
            }
            catch
            {
                return Ok();
            }
            

            
        }
        //[HttpPost("Light")]
        //public async Task<IActionResult> Light([FromForm] DateTime init, [FromForm] DateTime end, [FromForm] int type)
        //{
        //    if (init == null || end == null  || type == null)
        //    {
        //        return Ok();
        //    }
        //    var list = await _lightservice.GetLightning(init, end,type);

        //    return Ok(list);
        //}


        //private static readonly string[] Summaries = new[]
        //{
        //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //};

        //private readonly ILogger<WeatherForecastController> _logger;

        //public WeatherForecastController(ILogger<WeatherForecastController> logger)
        //{
        //    _logger = logger;
        //}

        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    var rng = new Random();

        //    return Enumerable.Range(1, 6).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.NetworkInformation;


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
        [HttpGet("DataLayers/{name}")]
        public async Task<IActionResult> DataLayer(string name)
        {
            try
            {
                string path = "Db/une/" + name;
                //StreamReader file = new StreamReader(result);
                FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read);
                FileStreamResult result2 = new FileStreamResult(file, "text/plain");
                return result2;
            }
            catch (Exception ex)
            {

                return Ok();
            }
            


            //return  PhysicalFile(result,"file/kml");
            //return Ok();
            
        }
        [HttpPost("Light")]
        public async Task<IActionResult> Light([FromForm] DateTime init,[FromForm] DateTime end, [FromForm] int[] peak, [FromForm] int type)
        {
            
            List<Flash> list ;
            Ping pings = new Ping();
            //if(pings.Send("10.0.4.117", 1000).Status != IPStatus.Success) {
            //    return StatusCode(408);
            //}
            try
            {
                if (peak[0] == 0 && peak[1] == 0)
                    list = await _lightservice.GetLightning(init, end, type);
                else list = await _lightservice.GetLightning(init, end, peak, type);
                return Ok(list);
            }
            catch(Exception ex)
            {
                return StatusCode(500);
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

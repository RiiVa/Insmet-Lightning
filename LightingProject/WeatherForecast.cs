using System;

namespace LightingProject
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
    public class Lightning
    {
        public DateTime Time { get; set; }
        public int Type { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double PeakCurrent { get; set; }
        public double IcHeight { get; set; }
        public int NumSensors { get; set; }
        public int IcMultiplicity { get; set; }
        public int CgMultiplicity { get; set; }
    }
}

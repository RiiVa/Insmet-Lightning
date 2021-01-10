using System;
using System.Data.SQLite;

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
public class MbTilesReader
{
    private string _mbTilesFilename;

    public MbTilesReader(string mbTilesFilename)
    {
        _mbTilesFilename = mbTilesFilename;
    }

    public byte[] GetImageData(int x, int y, int zoom)
    {
        byte[] imageData = null;
        Int64 imageID = 0;
        using (SQLiteConnection conn = new SQLiteConnection(string.Format("Data Source={0};Version=3;", _mbTilesFilename)))
        {
            conn.Open();
            using (SQLiteCommand cmd = new SQLiteCommand(conn))
            {
                cmd.CommandText = "SELECT * FROM map WHERE col = @x and row = @y and zoom = @z";
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.Add(new SQLiteParameter("@x", x));
                cmd.Parameters.Add(new SQLiteParameter("@y", y));
                cmd.Parameters.Add(new SQLiteParameter("@z", zoom));
                SQLiteDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    
                    //Console.WriteLine(reader[0]);
                    imageID = (Int64)reader.GetValue(3);

                }
                reader.Close();
                cmd.CommandText = "SELECT * FROM images WHERE tile_id=@id;";
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.Add(new SQLiteParameter("@id", imageID));
                reader = cmd.ExecuteReader();
                var pepo = reader;
                if (reader.Read())
                {
                    imageData = reader.GetValue(1) as byte[];
                    
                }
                
            }
        }
        return imageData;
    }
}

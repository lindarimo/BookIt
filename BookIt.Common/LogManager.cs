using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookIt.Common
{
    public class LogManager
    {

        public LogManager()
        {
            BasicConfigurator.Configure();
        }

        private static readonly ILog log = log4net.LogManager.GetLogger("BookIt");

        public static void Error(Exception ex)
        {
            log.Error(ex.Message, ex);
            System.Diagnostics.Debug.WriteLine($"{ex.Message}");
        }

        public static void Error(string message)
        {
            log.Error(message);
        }

        public static void Warning(string message)
        {
            log.Warn(message);
        }

        public static void Info(string message)
        {
            log.Info(message);
        }

        public static void Debug(string message)
        {
            log.Debug(message);
        }
    }
}

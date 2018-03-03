using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LiderAritma.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Anasayfa()
        {
            return View();
        }

        public ActionResult Kurumsal()
        {
            return View();
        }

        public ActionResult Iletisim()
        {
            return View();
        }

        public ActionResult Urunler()
        {
            return View();
        }
    }
}
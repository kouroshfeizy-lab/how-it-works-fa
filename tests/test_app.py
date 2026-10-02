import unittest

from app import TOPICS, app


class WebsiteRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_home_page(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("سازوکار جهان".encode(), response.data)
        self.assertEqual(response.data.count(b'class="point-card"'), 10)

    def test_first_article(self):
        response = self.client.get("/article/why-sky-is-blue")
        self.assertEqual(response.status_code, 200)
        self.assertIn("چرا آسمان آبی است؟".encode(), response.data)

    def test_all_topic_pages(self):
        topic_slugs = [topic["slug"] for topic in TOPICS]
        for slug in topic_slugs:
            with self.subTest(slug=slug):
                response = self.client.get(f"/topic/{slug}")
                self.assertEqual(response.status_code, 200)
                self.assertIn("سازوکار در سه حرکت".encode(), response.data)
                self.assertIn("خودت امتحان کن".encode(), response.data)

    def test_unknown_article_returns_custom_404(self):
        response = self.client.get("/article/not-found")
        self.assertEqual(response.status_code, 404)
        self.assertIn("این پرسش هنوز جوابی ندارد".encode(), response.data)


if __name__ == "__main__":
    unittest.main()

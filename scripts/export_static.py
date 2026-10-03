"""Render the Flask site's public pages for static hosting."""

import os
import re
from pathlib import Path
from shutil import copytree

from app import ARTICLE, TOPICS, app


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "site-output"
BASE_PATH = os.environ.get("SITE_BASE_PATH", "/how-it-works-fa").rstrip("/")


def page_routes():
    yield "/", OUTPUT / "index.html"
    for topic in TOPICS:
        yield f"/topic/{topic['slug']}", OUTPUT / "topic" / topic["slug"] / "index.html"
    yield f"/article/{ARTICLE['slug']}", OUTPUT / "article" / ARTICLE["slug"] / "index.html"


def normalize_detail_links(html):
    detail_link = re.compile(
        rf'href="({re.escape(BASE_PATH)}/(?:topic|article)/[^"#?]+)"'
    )
    return detail_link.sub(
        lambda match: 'href="' + match.group(1).rstrip("/") + '/"', html
    )


def export():
    with app.test_client() as client:
        for route, destination in page_routes():
            response = client.get(route, environ_overrides={"SCRIPT_NAME": BASE_PATH})
            if response.status_code != 200:
                raise RuntimeError(f"Could not export {route}: HTTP {response.status_code}")
            html = response.get_data(as_text=True)
            if BASE_PATH and f'href="{BASE_PATH}/static/' not in html:
                raise RuntimeError(f"Static asset paths are missing the base path on {route}")
            # Static hosts serve these pages from directory index files.
            html = normalize_detail_links(html)
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(html, encoding="utf-8")

        not_found = client.get("/missing-page", environ_overrides={"SCRIPT_NAME": BASE_PATH})
        if not_found.status_code != 404:
            raise RuntimeError("The custom 404 page did not render")
        (OUTPUT / "404.html").write_text(
            normalize_detail_links(not_found.get_data(as_text=True)), encoding="utf-8"
        )

    copytree(ROOT / "static", OUTPUT / "static", dirs_exist_ok=True)
    (OUTPUT / ".nojekyll").touch()
    print(f"Exported {len(TOPICS) + 3} pages to {OUTPUT}")


if __name__ == "__main__":
    export()


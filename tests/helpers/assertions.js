import $ from 'jquery';
import { click, findAll } from '@ember/test-helpers';

export function hasActivePage(assert, num, context) {
  var i = 0;
  $(".pagination li.page-number", context).each(function() {
    var li = $(this);
    var active = num - 1 === i;
    assert.equal(li.hasClass('active'), active, "Page "+(i+1)+" should have active = "+active+", actual: "+li.hasClass('active'));
    i += 1;
  });
}

export function hasButtons(assert, ops) {
  for (var name in ops) {
    var present = ops[name];

    if(present) {
      assert.equal(findAll(".pagination ." + name + ".enabled-arrow").length, 1);
    } else {
      assert.equal(findAll(".pagination ." + name + ".disabled").length, 1);
    }
  }
}

export function hasTodos(assert, l) {
  assert.equal(findAll("table tr.todo").length, l);
}

export function hasTodo(assert, num, name) {
  assert.equal(findAll("table tr.todo")[num].querySelector("td.name").textContent.trim(), name);
}

export function hasPages(assert, l) {
  assert.equal(findAll(".pagination li.page-number").length, l);
}

export async function clickPage(i) {
  if (i === "prev" || i === "next") {
    await click(".pagination ." + i + " a");
  } else {
    await click(findAll(".pagination li.page-number")[(i - 1)].querySelector("a"));
  }
}
